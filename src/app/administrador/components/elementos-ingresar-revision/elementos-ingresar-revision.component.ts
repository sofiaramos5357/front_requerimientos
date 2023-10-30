import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';

import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { CrudService } from 'src/app/services/crud.service';
import { DatosFichaTecnica } from 'src/app/models/datos-ficha-tecnica.model';
import { RequerimientoDetalle } from 'src/app/models/requerimiento-detalle.model';

@Component({
  selector: 'app-elementos-ingresar-revision',
  templateUrl: './elementos-ingresar-revision.component.html',
  styleUrls: ['./elementos-ingresar-revision.component.css'],
})
export class ElementosIngresarRevisionComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private datosUsuarioService: DatosUsuarioService,
    private router: Router,
    private crudService: CrudService
  ) {}

  //funcion que se ejecuta al recibir una respuesta del modal de eliminacion
  handleEliminar(eventData: { eliminar: boolean }) {
    this.eliminarRequerimiento();
  }

  palabraModal: string = 'Requerimiento'; // Variable para almacenar la palabra a mostrar en el modal

  // Declaración de variables miembro
  datosRuta: RequerimientoCreado; // Variable para almacenar datos del requerimiento
  datosUsuario: Usuario; // Variable para almacenar datos del usuario
  datosFichaTecnica: DatosFichaTecnica; // Variable para almacenar datos de ficha técnica
  requerimientoDetalles: RequerimientoDetalle[] = []; // Arreglo para almacenar detalles del requerimiento
  
  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1; // Página actual
  
  numDetalle: number = 0; // Número de detalle
  
  // Objeto para representar la revisión del requerimiento
  revision = {
    Id: 0,
    FechaRevision: new Date(),
    UsuarioIdAprobador: 0,
    ObservacionesRevision: '',
    NombreAprobador: '',
    ApellidoAprobador: '',
  };
  
  ngOnInit() {
    // Método que se ejecuta cuando se inicializa el componente
    this.obtenerDatosRuta(); // Llama a la función para obtener datos de la URL
    this.DatosUsuario(); // Llama a la función para obtener datos del usuario
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
          this.obtenerActividadesRealizadas(this.datosRuta.Id); // Llama a la función para obtener detalles del requerimiento
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
  
  obtenerFichaTecnica(id) {
    // Función para obtener datos de ficha técnica a través del servicio CRUD
    this.crudService.getFichaTecnica(id).subscribe((res: DatosFichaTecnica) => {
      this.datosFichaTecnica = res[0]; // Almacena los datos de ficha técnica
    });
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
  
  DatosUsuario() {
    // Función para obtener datos del usuario a través del servicio DatosUsuarioService
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
        this.datosUsuario = response[0]; // Almacena los datos del usuario
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }
  
  obtenerActividadesRealizadas(id) {
    // Función para obtener detalles del requerimiento a través del servicio CRUD
    this.crudService
      .getRequerimientoDetalle(id)
      .subscribe((res: RequerimientoDetalle[]) => {
        this.requerimientoDetalles = res; // Almacena los detalles del requerimiento
      });
  }
  
  getUsersForPage(): RequerimientoDetalle[] {
    // Función para obtener los detalles del requerimiento para la página actual
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.requerimientoDetalles.slice(startIndex, endIndex);
  }
  
  getTotalPages(): number {
    // Función para calcular el número total de páginas en función de la cantidad de detalles del requerimiento
    return Math.ceil(this.requerimientoDetalles.length / this.itemsPerPage);
  }
  
  getPages(): number[] {
    // Función para obtener un arreglo de números que representa las páginas disponibles
    return Array(this.getTotalPages())
      .fill(0)
      .map((_, index) => index + 1);
  }
  
  aprobarRequerimiento() {
    // Función para aprobar un requerimiento a través del servicio CRUD
    this.revision.Id = this.datosRuta.Id;
    this.revision.UsuarioIdAprobador = this.datosUsuario.Id;
    this.crudService.revisionAprobada(this.revision).subscribe(
      (res) => {
        alertifyjs.success(res.message); // Muestra una notificación de éxito
        this.router.navigate(['/home/admin']); // Navega a la página de inicio del administrador
      },
      (error) => {
        // Maneja cualquier error que ocurra al aprobar el requerimiento
      }
    );
  }
  
  denegarRequerimiento() {
    // Función para denegar un requerimiento a través del servicio CRUD
    this.revision.Id = this.datosRuta.Id;
    this.revision.UsuarioIdAprobador = this.datosUsuario.Id;
    this.crudService.revisionDenegada(this.revision).subscribe(
      (res) => {
        alertifyjs.success(res.message); // Muestra una notificación de éxito
        this.router.navigate(['/home/admin']); // Navega a la página de inicio del administrador
      },
      (error) => {
        // Maneja cualquier error que ocurra al denegar el requerimiento
      }
    );
  }
}  