import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';
import { TipoObjeto } from 'src/app/models/tipo-objeto.model';
import { CrudService } from 'src/app/services/crud.service';
import { RequerimientoDetalle } from 'src/app/models/requerimiento-detalle.model';

@Component({
  selector: 'app-elementos-re-detalle',
  templateUrl: './elementos-re-detalle.component.html',
  styleUrls: ['./elementos-re-detalle.component.css'],
})
export class ElementosReDetalleComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crudService: CrudService
  ) {}

  datosRuta: RequerimientoCreado; // Almacena datos relacionados con el requerimiento.

  tipoObjetos: TipoObjeto[]; // Almacena una lista de tipos de objetos.
  detalles: RequerimientoDetalle[] = []; // Almacena una lista de detalles de requerimiento.
  numDetalle: number = 0; // Variable para rastrear el número de detalles.
  
  itemsPerPage: number = 10; // Número de elementos a mostrar por página en una lista.
  currentPage: number = 1; // Número de la página actual.
  
  requerimientoDetalle: RequerimientoDetalle = {
    Id: 0,
    TipoObjetoId: 0,
    Objeto: '',
    Ubicacion: '',
    Actividad: '',
    Observaciones: '',
    FechaRegistro: new Date(),
    RequerimientoCambioId: 0,
    NombreObjeto: '',
  }; // Almacena un detalle de requerimiento que se está creando o editando.
  
  tipoObjeto: TipoObjeto = {
    Id: 0,
    Nombre: '',
    Activo: true,
  }; // Almacena un tipo de objeto que se está creando.
  
  detalleActual: any = {}; // Almacena un detalle de requerimiento actual que se está editando.
  
  ngOnInit() {
    // Método que se ejecuta al inicializar el componente.
    this.obtenerDatosRuta();
    this.ObtenerTipoObjeto();
    this.detallesCreados();
    this.mensajeAlmacenado();
  }
  
  obtenerDatosRuta() {
    // Recupera los datos pasados a través de los parámetros de la ruta.
    this.route.queryParams.subscribe((params) => {
      const requerimientoParam = params['requerimiento'];
      if (requerimientoParam) {
        try {
          const requerimiento = JSON.parse(requerimientoParam);
          // Utilizar los datos de requerimiento en este componente.
          this.datosRuta = requerimiento;
        } catch (error) {
          console.error('Error al analizar JSON:', error);
          // Maneja el error de análisis JSON.
        }
      } else {
        console.error("El parámetro 'requerimiento' es undefined o null");
        // Maneja el caso en el que el parámetro 'requerimiento' no esté definido.
      }
    });
  }
  
  ObtenerTipoObjeto() {
    // Obtiene los tipos de objetos y almacena solo los activos.
    this.crudService.getTipoObjetosActivos().subscribe((res: TipoObjeto[]) => {
      this.tipoObjetos = res;
    });
  }
  
  crearDetalle() {
    // Crea un detalle de requerimiento.
    this.requerimientoDetalle.RequerimientoCambioId = this.datosRuta.Id;
  
    this.crudService
      .crearRequerimientoDetalle(this.requerimientoDetalle)
      .subscribe(
        (res) => {
          // Aquí puedes manejar la respuesta del backend si es necesario.
          console.log('Detalle de requerimiento creado', res);
          localStorage.setItem('mensaje', res.message);
          window.location.reload();
          alertifyjs.success(res.message);
        },
        (error) => {
          // Manejar errores aquí.
        }
      );
  }
  
  detallesCreados() {
    // Obtiene los detalles de requerimiento creados.
    this.crudService
      .getRequerimientoDetalle(this.datosRuta.Id)
      .subscribe((res: RequerimientoDetalle[]) => {
        // Filtrar los elementos que no tienen estadoId igual a 5 o 6.
        this.detalles = res;
        this.estadoIniciado(this.detalles);
      });
  }

  getUsersForPage(): RequerimientoDetalle[] {
    // Obtiene un subconjunto de detalles de requerimiento para mostrar en la página actual.
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.detalles.slice(startIndex, endIndex);
  }
  
  getTotalPages(): number {
    // Calcula el número total de páginas necesarias para mostrar todos los detalles de requerimiento.
    return Math.ceil(this.detalles.length / this.itemsPerPage);
  }
  
  getPages(): number[] {
    // Crea una lista de números de página para la paginación.
    return Array(this.getTotalPages())
      .fill(0)
      .map((_, index) => index + 1);
  }
  
  abrirModal(detalle: any) {
    // Abre un modal y copia los datos originales del detalle.
    this.detalleActual = { ...detalle };
    // Puedes agregar aquí la lógica para mostrar el modal.
  }
  
  guardarCambio() {
    // Guarda los cambios realizados en un detalle de requerimiento.
    this.crudService
      .modificarRequerimientoDetalle(this.detalleActual)
      .subscribe(
        (res) => {
          // Aquí puedes manejar la respuesta del backend si es necesario.
          console.log('Detalle de requerimiento editado creado', res);
          localStorage.setItem('mensaje', res.message);
          window.location.reload();
          alertifyjs.success(res.message);
        },
        (error) => {
          // Manejar errores aquí.
        }
      );
  }
  
  mensajeAlmacenado() {
    // Verifica si hay un mensaje almacenado en el almacenamiento local y lo muestra.
    const mensaje = localStorage.getItem('mensaje');
    if (mensaje) {
      // Mostrar el mensaje con alertify o cualquier otro mecanismo de notificación.
      alertifyjs.success(mensaje);
  
      // Limpiar el mensaje del almacenamiento local.
      localStorage.removeItem('mensaje');
    }
  }
  
  camposLlenos(): boolean {
    // Verifica si todos los campos obligatorios en el detalle de requerimiento están llenos.
    return (
      this.requerimientoDetalle.Objeto.trim() !== '' &&
      this.requerimientoDetalle.Ubicacion.trim() !== '' &&
      this.requerimientoDetalle.Actividad.trim() !== ''
    );
  }
  
  eliminarDetalle(Id: number) {
    // Elimina un detalle de requerimiento por su ID.
    this.crudService.eliminarRequerimientoDetalle(Id).subscribe(
      (res) => {
        // Aquí puedes manejar la respuesta del backend si es necesario.
        console.log('Detalle eliminado', res);
        localStorage.setItem('mensaje', res.message);
        window.location.reload();
      },
      (error) => {
        // Manejar errores aquí.
      }
    );
  }
  
  enviarReq() {
    // Envía el requerimiento para revisión y navega a una página específica.
    this.crudService.pendienteRevisar(this.datosRuta.Id).subscribe(
      (res) => {
        this.router.navigate(['/home/elaborador']);
        alertifyjs.success(res.message);
      },
      (error) => {
        // Manejar errores aquí.
      }
    );
  }
  
  estadoIniciado(detalles) {
    // Si el requerimiento está en estado de revisión y se edita de manera que elimina todas las actividades, vuelve al estado anterior de "iniciado".
    if (detalles.length === 0 && this.datosRuta.RequerimientoEstadoId === 3) {
      this.crudService.estadoIniciado(this.datosRuta.Id).subscribe(
        (res) => {
          alertifyjs.success(res.message);
        },
        (error) => {
          // Manejar errores aquí.
        }
      );
    }
  }
  
  crearTipoObjeto() {
    // Crea un nuevo tipo de objeto.
    this.crudService.crearTipoObjeto(this.tipoObjeto).subscribe(
      (res) => {
        // Puedes agregar lógica para navegar a una página específica si es necesario.
        localStorage.setItem('mensaje', res.message);
        window.location.reload();
      },
      (error) => {
        // Manejar errores aquí.
      }
    );
  }
  
}
