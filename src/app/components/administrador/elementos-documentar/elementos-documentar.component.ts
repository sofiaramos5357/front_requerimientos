import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';

import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { CrudService } from 'src/app/services/crud.service';
import { DatosFichaTecnica } from 'src/app/models/datos-ficha-tecnica.model';

import pdfMake from 'pdfmake/build/pdfMake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-elementos-documentar',
  templateUrl: './elementos-documentar.component.html',
  styleUrls: ['./elementos-documentar.component.css']
})
export class ElementosDocumentarComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private datosUsuarioService: DatosUsuarioService,
    private router: Router,
    private crudService: CrudService,
    private http: HttpClient
  ) { }

  datosRuta: RequerimientoCreado
  datosUsuario: Usuario

  datosFichaTecnica: DatosFichaTecnica

  imageDataUri: string;



  ngOnInit() {
    this.obtenerDatosRuta()
    this.DatosUsuario()
    this.loadImage();

  }

  obtenerDatosRuta() {
    // Recupera los datos pasados a través de los parámetros de la ruta
    this.route.queryParams.subscribe(params => {
      const requerimientoParam = params['requerimiento'];
      //console.log(requerimientoParam);
      if (requerimientoParam) {
        try {
          const requerimiento = JSON.parse(requerimientoParam);
          // utilizar los datos de requerimiento en este componente
          this.datosRuta = requerimiento
          this.obtenerFichaTecnica(this.datosRuta.Id)

        } catch (error) {
          console.error("Error al analizar JSON:", error);
          // Maneja el error de análisis JSON 
        }
      } else {
        console.error("El parámetro 'requerimiento' es undefined o null");
        // Maneja el caso en el que el parámetro 'requerimiento' no esté definido
      }
    });
  }

  DatosUsuario() {
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
        this.datosUsuario = response[0];
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  eliminarRequerimiento() {

    this.crudService.eliminarRequerimiento(this.datosRuta).subscribe(
      (res) => {
        alertifyjs.success(res.message)
        this.router.navigate(['/home']);
        //console.log('Requerimiento modificado correctamente', res);
      },
      (error) => {
        //     // Manejar errores aquí, si es necesario
        //     //console.error('Error al modificar usuario', error);
      }
    );
  }

  obtenerFichaTecnica(id) {
    this.crudService.getFichaTecnica(id).subscribe((res: DatosFichaTecnica) => {
      this.datosFichaTecnica = res[0]
      //console.log(this.datosFichaTecnica)
    });

  }

  loadImage() {
    // Ruta relativa a la imagen en la carpeta de activos
    const imagePath = 'assets/papelMembretado.jpeg';

    // Cargar la imagen como una representación de datos URI
    this.http.get(imagePath, { responseType: 'blob' }).subscribe((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.imageDataUri = reader.result as string;
      };
    });
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('es-ES', options);
  }
  
  crearPDF() {
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
          table: {
            widths: ['*', '*'], // Dos columnas iguales
            body: [
              [
                { text: 'Descripción del requerimiento:', margin: [20, 30, 0, 15] }, 
                { text: this.datosRuta.Descripcion, margin: [20, 30, 0, 15] }, 
              ],
              [
                { text: 'Fecha de creación:', margin: [20, 0, 0, 15] }, 
                { text: this.formatDate(new Date(this.datosRuta.FechaCreacion)), margin: [20, 0, 0, 15] }, 
              ],
              [
                { text: 'Número de Requerimiento:', margin: [20, 0, 0, 15] }, 
                { text: this.datosRuta.Id, margin: [20, 0, 0, 15] }, 
              ],
              [
                { text: 'Usuario Creador:', margin: [20, 0, 0, 15] }, 
                { text: `${this.datosRuta.NombreCreador} ${this.datosRuta.ApellidoCreador}`, margin: [20, 0, 0, 15] }, 
              ],
              [
                { text: 'Usuario Elaborador:', margin: [20, 0, 0, 15] }, 
                { text: `${this.datosRuta.NombreElaborador} ${this.datosRuta.ApellidoElaborador}`, margin: [20, 0, 0, 15] }, // Margen inferior
              ],
              [
                { text: 'Fecha de finalización:', margin: [20, 0, 0, 15] }, 
                { text: this.formatDate(new Date(this.datosRuta.FechaEntrega)), margin: [20, 0, 0, 15] }, 
              ],
              [
                { text: '___________________________', margin: [20, 90, 0, 15] }, 
                { text: '___________________________', margin: [20, 90, 0, 15] }, 
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
          absolutePosition: { x: 0, y: 0 } // Posición absoluta en la esquina superior izquierda
        },
      ],
    };
    pdfMake.createPdf(pdfDefinicion).open();
  }

  private fileTmp:any
  Fecha: Date = new Date();

  getFile($event: any): void{
    const [file]=$event.target.files;
    this.fileTmp={
      fileRaw: file,
      fileName: file.name
    }
  }

  sendFile():void{
    const body=new FormData();
    body.append('myFile', this.fileTmp.fileRaw,this.fileTmp.fileName)
    body.append('RequerimientoCambioId', String(this.datosRuta.Id));
    body.append('Fecha', String(this.Fecha));
    body.append('SistemaId', String(this.datosRuta.SistemaId));


    this.crudService.sendPost(body).subscribe(
      (res) => {
        alertifyjs.success(res.message)
        this.router.navigate(['/home']);
      },
      (error) => {
        //     // Manejar errores aquí, si es necesario
        //     //console.error('Error al modificar usuario', error);
      }
    );
  }

}
