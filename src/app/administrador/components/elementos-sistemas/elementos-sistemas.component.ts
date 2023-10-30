import { Component, OnInit } from '@angular/core';
import * as alertifyjs from 'alertifyjs';
import { CrudService } from 'src/app/services/crud.service';
import { Sistema } from 'src/app/models/sistema.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elementos-sistemas',
  templateUrl: './elementos-sistemas.component.html',
  styleUrls: ['./elementos-sistemas.component.css'],
})
export class ElementosSistemasComponent implements OnInit {
  constructor(private crudService: CrudService, private router: Router) {}

  sistemas: Sistema[] = []; // Arreglo para almacenar sistemas
  itemsPerPage: number = 5; // Número de elementos por página
  currentPage: number = 1; // Página actual
  sistema: Sistema[] = []; // Arreglo para almacenar un sistema específico
  mensaje: string = 'No hay sistemas registrados.'; // Variable para almacenar la palabra a mostrar en el modal

  mensajeAlmacenado() {
    // Función para verificar si hay un mensaje almacenado en el almacenamiento local
    const mensaje = localStorage.getItem('mensaje');
    if (mensaje) {
      // Mostrar el mensaje con alertify o cualquier otro mecanismo de notificación
      alertifyjs.success(mensaje);

      // Limpiar el mensaje del almacenamiento local
      localStorage.removeItem('mensaje');
    }
  }

  ngOnInit(): void {
    // Método que se ejecuta cuando se inicializa el componente
    this.getSistemas(); // Llama a la función para obtener sistemas
    this.mensajeAlmacenado(); // Llama a la función para verificar mensajes almacenados
  }

  getSistemas() {
    // Función para obtener sistemas a través del servicio CRUD
    this.crudService.getSistemas().subscribe((res: Sistema[]) => {
      this.sistemas = res; // Almacena los sistemas obtenidos
    });
  }

  getUsersForPage(): Sistema[] {
    // Función para obtener los sistemas para la página actual
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.sistemas.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    // Función para calcular el número total de páginas en función de la cantidad de sistemas
    return Math.ceil(this.sistemas.length / this.itemsPerPage);
  }

  getPages(): number[] {
    // Función para obtener un arreglo de números que representa las páginas disponibles
    return Array(this.getTotalPages())
      .fill(0)
      .map((_, index) => index + 1);
  }

  getSistema(id) {
    // Función para obtener un sistema específico a través del servicio CRUD
    this.crudService.getSistema(id).subscribe((res: Sistema[]) => {
      this.sistema = res; // Almacena el sistema obtenido
    });
  }

  modificar() {
    // Función para modificar un sistema
    const sistema: Sistema = {
      Id: this.sistema[0].Id,
      Nombre: this.sistema[0].Nombre,
      Activo: false,
    };
    this.crudService.modificarSistema(sistema).subscribe(
      (res) => {
        localStorage.setItem('mensaje', res.message); // Almacena un mensaje en el almacenamiento local
        window.location.reload(); // Recarga la página
      },
      (error) => {
        // Maneja cualquier error que ocurra al modificar el sistema
      }
    );
  }

  DesactivaroActivar(sistemas) {
    // Función para desactivar o activar un sistema
    let id = sistemas.Id;

    if (sistemas.Activo === true) {
      // Si el sistema está activo, desactívalo
      this.crudService.eliminarSistema(id).subscribe(
        (res) => {
          localStorage.setItem('mensaje', res.message); // Almacena un mensaje en el almacenamiento local
          window.location.reload(); // Recarga la página
        },
        (error) => {
          console.error('Error al desactivar:', error);
        }
      );
    } else {
      // Si el sistema está inactivo, actívalo
      this.crudService.activarSistema(id).subscribe(
        (res) => {
          localStorage.setItem('mensaje', res.message); // Almacena un mensaje en el almacenamiento local
          window.location.reload(); // Recarga la página
        },
        (error) => {
          console.error('Error al activar:', error);
        }
      );
    }
  }

  enviarDatos(SistemaId) {
    // Función para enviar datos a otra página
    if (SistemaId !== null && SistemaId !== undefined) {
      this.router.navigate(['/changelog'], {
        queryParams: { sistemaId: JSON.stringify(SistemaId) },
      });
    } else {
      console.error("El objeto 'SistemaId' está vacío o no está definido.");
    }
  }
}
