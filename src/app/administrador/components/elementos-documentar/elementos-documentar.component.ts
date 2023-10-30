// Importa las clases y módulos necesarios desde Angular y otras ubicaciones
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';

import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { CrudService } from 'src/app/services/crud.service';
import { DatosFichaTecnica } from 'src/app/models/datos-ficha-tecnica.model';

import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { HttpClient } from '@angular/common/http';

@Component({
  // Define el componente y configura su plantilla y hojas de estilo
  selector: 'app-elementos-documentar',
  templateUrl: './elementos-documentar.component.html',
  styleUrls: ['./elementos-documentar.component.css'],
})
export class ElementosDocumentarComponent implements OnInit {
  constructor(
    // Constructor del componente que inyecta las dependencias necesarias
    private route: ActivatedRoute, // Objeto para acceder a los parámetros de la URL
    private datosUsuarioService: DatosUsuarioService, // Servicio para obtener datos del usuario
    private router: Router, // Router para navegar a diferentes rutas
    private crudService: CrudService, // Servicio para realizar operaciones CRUD
    private http: HttpClient // Módulo para realizar solicitudes HTTP
  ) {}

  // Declaración de variables miembro
  datosRuta: RequerimientoCreado; // Variable para almacenar datos del requerimiento
  datosUsuario: Usuario; // Variable para almacenar datos del usuario
  datosFichaTecnica: DatosFichaTecnica; // Variable para almacenar datos de ficha técnica
  imageDataUri: string; // Variable para almacenar datos de una imagen como URI
  palabraModal: string = 'Requerimiento'; // Variable para almacenar la palabra a mostrar en el modal

  private fileTmp: any;
  Fecha: Date = new Date();

  // Método para manejar el evento de eliminación
  handleEliminar(eventData: { eliminar: boolean }) {
    this.eliminarRequerimiento();
  }

  ngOnInit() {
    // Método que se ejecuta cuando se inicializa el componente
    this.obtenerDatosRuta(); // Llama a la función para obtener datos de la URL
    this.DatosUsuario(); // Llama a la función para obtener datos del usuario
    this.loadImage(); // Llama a la función para cargar una imagen
  }

  obtenerDatosRuta() {
    // Función para obtener datos de la URL
    this.route.queryParams.subscribe((params) => {
      const requerimientoParam = params['requerimiento'];
      if (requerimientoParam) {
        try {
          const requerimiento = JSON.parse(requerimientoParam);
          this.datosRuta = requerimiento; // Almacena los datos del requerimiento
          this.obtenerFichaTecnica(this.datosRuta.Id); // Llama a la función para obtener ficha técnica
          console.log(requerimiento);
        } catch (error) {
          console.error('Error al analizar JSON:', error);
          // Maneja el error de análisis JSON
        }
      } else {
        console.error("El parámetro 'requerimiento' es undefined o null");
        // Maneja el caso en el que el parámetro 'requerimiento' no esté definido
      }
    });
  }

  DatosUsuario() {
    // Función para obtener datos del usuario a través del servicio
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
        this.datosUsuario = response[0]; // Almacena los datos del usuario
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  eliminarRequerimiento() {
    // Función para eliminar un requerimiento a través del servicio CRUD
    this.crudService.eliminarRequerimiento(this.datosRuta).subscribe(
      (res) => {
        alertifyjs.success(res.message); // Muestra una notificación de éxito
        this.router.navigate(['/home/admin']); // Navega a la página de inicio del administrador
      },
      (error) => {
        // Maneja cualquier error que ocurra al eliminar el requerimiento
      }
    );
  }

  obtenerFichaTecnica(id) {
    // Función para obtener datos de ficha técnica a través del servicio CRUD
    this.crudService.getFichaTecnica(id).subscribe((res: DatosFichaTecnica) => {
      this.datosFichaTecnica = res[0]; // Almacena los datos de ficha técnica
    });
  }

  loadImage() {
    // Función para cargar una imagen y convertirla en una URI de datos
    // Ruta relativa a la imagen en la carpeta de activos
    const imagePath = 'assets/papelmembretado/papelMembretado.jpeg';

    // Cargar la imagen como una representación de datos URI
    this.http.get(imagePath, { responseType: 'blob' }).subscribe((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.imageDataUri = reader.result as string; // Almacena la URI de la imagen
      };
    });
  }

  formatDate(date: Date): string {
    // Función para formatear una fecha a un formato específico
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return date.toLocaleDateString('es-ES', options);
  }

  crearPDF() {
    // Función para crear un documento PDF con datos específicos
    const pdfDefinicion: any = {
      pageSize: 'letter', // Tamaño de página carta (8.5 x 11 pulgadas)
      pageMargins: [40, 40, 40, 40], // Márgenes de página en puntos (1 pulgada = 72 puntos)
      content: [
        {
          text: 'Documentación de requerimiento',
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 50, 10, 5], // Margen inferior
        },
        {
          text: `En este documento, se reporta que se realizaron cambios en el sistema ${this.datosRuta.NombreSistema} con el objetivo de ${this.datosRuta.Objetivo}.`,
          fontSize: 14,
          margin: [20, 30, 20, 5], // Margen inferior
        },
        {
          text: 'Especificaciones',
          fontSize: 14,
          bold: true,
          margin: [20, 30, 20, 5], // Margen inferior
        },
        {
          // Detalles del requerimiento y otros elementos
          table: {
            widths: ['*', '*'], // Dos columnas iguales
            body: [
              [
                {
                  text: 'Descripción del requerimiento:',
                  margin: [20, 30, 0, 15],
                },
                { text: this.datosRuta.Descripcion, margin: [20, 30, 0, 15] },
              ],
              [
                { text: 'Fecha de creación:', margin: [20, 0, 0, 15] },
                {
                  text: this.formatDate(new Date(this.datosRuta.FechaCreacion)),
                  margin: [20, 0, 0, 15],
                },
              ],
              [
                { text: 'Número de Requerimiento:', margin: [20, 0, 0, 15] },
                { text: this.datosRuta.Id, margin: [20, 0, 0, 15] },
              ],
              [
                { text: 'Usuario Creador:', margin: [20, 0, 0, 15] },
                {
                  text: `${this.datosRuta.NombreCreador} ${this.datosRuta.ApellidoCreador}`,
                  margin: [20, 0, 0, 15],
                },
              ],
              [
                { text: 'Usuario Elaborador:', margin: [20, 0, 0, 15] },
                {
                  text: `${this.datosRuta.NombreElaborador} ${this.datosRuta.ApellidoElaborador}`,
                  margin: [20, 0, 0, 15],
                },
              ],
              [
                { text: 'Fecha Revisión:', margin: [20, 0, 0, 15] },
                {
                  text: this.formatDate(new Date(this.datosRuta.FechaRevision)),
                  margin: [20, 0, 0, 15],
                },
              ],
              [
                {
                  text: '___________________________',
                  margin: [20, 90, 0, 15],
                },
                {
                  text: '___________________________',
                  margin: [20, 90, 0, 15],
                },
              ],
              [
                { text: 'Creador', margin: [20, 0, 0, 15] },
                { text: 'Elaborador', margin: [20, 0, 0, 15] },
              ],
            ],
          },
          layout: 'noBorders', // Sin bordes en la tabla
          margin: [0, 0, 0, 10], // Margen inferior
        },
      ],
      background: [
        {
          image: this.imageDataUri, // Establecer la imagen como fondo
          width: 595, // Ancho de página carta en puntos (8.5 x 72 = 612 puntos)
          absolutePosition: { x: 0, y: 0 }, // Posición absoluta en la esquina superior izquierda
        },
      ],
    };
    pdfMake.createPdf(pdfDefinicion).open(); // Crea y abre el PDF
  }

  getFile($event: any): void {
    // Función para obtener un archivo seleccionado por el usuario
    const [file] = $event.target.files;
    this.fileTmp = {
      fileRaw: file,
      fileName: file.name,
    };
  }

  sendFile(): void {
    // Función para enviar un archivo a través de una solicitud HTTP
    const body = new FormData();
    body.append('myFile', this.fileTmp.fileRaw, this.fileTmp.fileName);
    body.append('RequerimientoCambioId', String(this.datosRuta.Id));
    body.append('Fecha', String(this.Fecha));
    body.append('SistemaId', String(this.datosRuta.SistemaId));

    this.crudService.sendPost(body).subscribe(
      (res) => {
        alertifyjs.success(res.message); // Muestra una notificación de éxito
        this.router.navigate(['/home/admin']); // Navega a la página de inicio del administrador
      },
      (error) => {
        // Maneja cualquier error que ocurra al enviar el archivo
      }
    );
  }
}
