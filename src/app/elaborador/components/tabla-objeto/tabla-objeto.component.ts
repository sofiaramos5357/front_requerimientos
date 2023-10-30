import { Component, OnInit } from '@angular/core';
import * as alertifyjs from 'alertifyjs';
import { CrudService } from 'src/app/services/crud.service';
import { TipoObjeto } from 'src/app/models/tipo-objeto.model';

@Component({
  selector: 'app-tabla-objeto',
  templateUrl: './tabla-objeto.component.html',
  styleUrls: ['./tabla-objeto.component.css'],
})
export class TablaObjetoComponent implements OnInit {
  constructor(private crudService: CrudService) {}

  tipoObjetos: TipoObjeto[] = []; // Arreglo para almacenar los tipos de objeto

  itemsPerPage: number = 5; // Número de elementos por página
  currentPage: number = 1; // Página actual
  
  tipoObjeto: TipoObjeto[] = []; // Arreglo para almacenar un tipo de objeto específico
  
  mensaje: string = 'No hay tipos de objetos.'; // Variable para almacenar un mensaje a mostrar en el modal
  
  mensajeAlmacenado() {
    // Verificar si hay un mensaje almacenado en el almacenamiento local
    const mensaje = localStorage.getItem('mensaje');
    if (mensaje) {
      // Mostrar el mensaje con alertify u otro mecanismo de notificación
      alertifyjs.success(mensaje);
  
      // Limpiar el mensaje del almacenamiento local
      localStorage.removeItem('mensaje');
    }
  }
  
  ngOnInit(): void {
    this.getTipoObjetos(); // Llama a la función para obtener los tipos de objetos al inicializar el componente
    this.mensajeAlmacenado(); // Llama a la función para mostrar mensajes almacenados
  }
  
  getTipoObjetos() {
    // Obtiene los tipos de objeto desde el servicio y los almacena en tipoObjetos
    this.crudService.getTipoObjetos().subscribe((res: TipoObjeto[]) => {
      this.tipoObjetos = res;
    });
  }
  
  getUsersForPage(): TipoObjeto[] {
    // Obtiene los tipos de objeto para la página actual
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.tipoObjetos.slice(startIndex, endIndex);
  }
  
  getTotalPages(): number {
    // Calcula el número total de páginas en función de la cantidad de tipos de objeto
    return Math.ceil(this.tipoObjetos.length / this.itemsPerPage);
  }
  
  getPages(): number[] {
    // Obtiene un arreglo de números que representan las páginas disponibles
    return Array(this.getTotalPages())
      .fill(0)
      .map((_, index) => index + 1);
  }
  
  getTipoObjeto(id) {
    // Obtiene un tipo de objeto específico por su ID y lo almacena en tipoObjeto
    this.crudService.getTipoObjeto(id).subscribe((res: TipoObjeto[]) => {
      this.tipoObjeto = res;
    });
  }
  
  modificar() {
    // Modifica un tipo de objeto, cambia su estado a inactivo
    const tipoObjeto: TipoObjeto = {
      Id: this.tipoObjeto[0].Id,
      Nombre: this.tipoObjeto[0].Nombre,
      Activo: false,
    };
    this.crudService.modificarTipoObjeto(tipoObjeto).subscribe(
      (res) => {
        localStorage.setItem('mensaje', res.message);
        window.location.reload();
      },
      (error) => {}
    );
  }
  
  DesactivaroActivar(tipoObjetos) {
    let id = tipoObjetos.Id;
  
    if (tipoObjetos.Activo === true) {
      // Desactiva un tipo de objeto
      this.crudService.eliminarTipoObjeto(id).subscribe(
        (res) => {
          localStorage.setItem('mensaje', res.message);
          window.location.reload();
        },
        (error) => {
          console.error('Error al desactivar:', error);
        }
      );
    } else {
      // Activa un tipo de objeto
      this.crudService.activarTipoObjeto(id).subscribe(
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
