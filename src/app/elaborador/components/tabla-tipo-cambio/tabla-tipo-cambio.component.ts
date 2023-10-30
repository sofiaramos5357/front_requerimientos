import { Component, OnInit } from '@angular/core';
import * as alertifyjs from 'alertifyjs';
import { CrudService } from 'src/app/services/crud.service';
import { TipoCambio } from 'src/app/models/tipo-cambio.model';

@Component({
  selector: 'app-tabla-tipo-cambio',
  templateUrl: './tabla-tipo-cambio.component.html',
  styleUrls: ['./tabla-tipo-cambio.component.css'],
})
export class TablaTipoCambioComponent implements OnInit {
  constructor(private crudService: CrudService) {}

  tipoCambios: TipoCambio[] = []; // Arreglo para almacenar los tipos de cambio

  itemsPerPage: number = 5; // Número de elementos por página
  currentPage: number = 1; // Página actual
  
  tipoCambio: TipoCambio[] = []; // Arreglo para almacenar un tipo de cambio seleccionado
  
  mensaje: string = 'No hay tipos de cambio.'; // Variable para almacenar el mensaje a mostrar en el modal
  
  mensajeAlmacenado() {
    // Esta función verifica si hay un mensaje almacenado en el almacenamiento local y lo muestra mediante una notificación.
    const mensaje = localStorage.getItem('mensaje');
    if (mensaje) {
      // Mostrar el mensaje con alertify o cualquier otro mecanismo de notificación
      alertifyjs.success(mensaje);
  
      // Limpiar el mensaje del almacenamiento local
      localStorage.removeItem('mensaje');
    }
  }
  
  ngOnInit(): void {
    this.getTipoCambios(); // Llama a la función para obtener los tipos de cambio al inicializar el componente
    this.mensajeAlmacenado(); // Verifica si hay mensajes almacenados en el almacenamiento local y los muestra
  }
  
  getTipoCambios() {
    // Obtiene la lista de tipos de cambio desde el servicio y la almacena en el arreglo tipoCambios.
    this.crudService.getTipoCambios().subscribe((res: TipoCambio[]) => {
      this.tipoCambios = res;
    });
  }
  
  getUsersForPage(): TipoCambio[] {
    // Obtiene los tipos de cambio para la página actual
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.tipoCambios.slice(startIndex, endIndex);
  }
  
  getTotalPages(): number {
    // Calcula el número total de páginas en función de la cantidad de tipos de cambio
    return Math.ceil(this.tipoCambios.length / this.itemsPerPage);
  }
  
  getPages(): number[] {
    // Obtiene un arreglo de números que representan las páginas disponibles
    return Array(this.getTotalPages())
      .fill(0)
      .map((_, index) => index + 1);
  }
  
  getTipoCambio(id) {
    // Obtiene un tipo de cambio específico y lo almacena en el arreglo tipoCambio.
    this.crudService.getTipoCambio(id).subscribe((res: TipoCambio[]) => {
      this.tipoCambio = res;
    });
  }
  
  modificar() {
    // Crea un objeto tipoCambio con los datos del tipo de cambio seleccionado para su modificación
    const tipoCambio: TipoCambio = {
      Id: this.tipoCambio[0].Id,
      Nombre: this.tipoCambio[0].Nombre,
      Activo: false,
    };
    // Llama al servicio para modificar el tipo de cambio
    this.crudService.modificarTipoCambio(tipoCambio).subscribe(
      (res) => {
        localStorage.setItem('mensaje', res.message);
        window.location.reload(); // Recarga la página para reflejar los cambios
      },
      (error) => {
        // Maneja los errores en caso de que la solicitud falle
      }
    );
  }
  
  DesactivaroActivar(tipoCambio) {
    // Función para desactivar o activar un tipo de cambio en función de su estado actual.
    let id = tipoCambio.Id;
  
    if (tipoCambio.Activo === true) {
      // Si el tipo de cambio está activo, llama al servicio para desactivarlo.
      this.crudService.eliminarTipoCambio(id).subscribe(
        (res) => {
          localStorage.setItem('mensaje', res.message);
          window.location.reload();
        },
        (error) => {
          console.error('Error al desactivar:', error);
        }
      );
    } else {
      // Si el tipo de cambio está desactivado, llama al servicio para activarlo.
      this.crudService.activarTipoCambio(id).subscribe(
        (res) => {
          localStorage.setItem('mensaje', res.message);
          window.location.reload();
        },
        (error) => {
          console.error('Error al activar:', error);
        }
      );
    }
  }
  
}
