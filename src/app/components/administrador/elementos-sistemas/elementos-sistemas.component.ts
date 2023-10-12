import { Component, OnInit } from '@angular/core';
import * as alertifyjs from 'alertifyjs';
import { CrudService } from 'src/app/services/crud.service';
import { TipoObjeto } from 'src/app/models/tipo-objeto.model';
import { Sistema } from 'src/app/models/sistema.model';

@Component({
  selector: 'app-elementos-sistemas',
  templateUrl: './elementos-sistemas.component.html',
  styleUrls: ['./elementos-sistemas.component.css']
})
export class ElementosSistemasComponent implements OnInit {
  constructor(
    private crudService: CrudService,
  ) {}

  sistemas: Sistema[] = [];

  itemsPerPage: number = 5; // Número de elementos por página
  currentPage: number = 1; // Página actual

  sistema: Sistema[] = [];



  mensajeAlmacenado() {
    // Verificar si hay un mensaje almacenado en el almacenamiento local
    const mensaje = localStorage.getItem('mensaje');
    if (mensaje) {
      // Mostrar el mensaje con alertify o cualquier otro mecanismo de notificación
      alertifyjs.success(mensaje);

      // Limpiar el mensaje del almacenamiento local
      localStorage.removeItem('mensaje');
    }
  }

  ngOnInit(): void {
    this.getSistemas();
    this.mensajeAlmacenado();
  }

  getSistemas() {
    this.crudService.getSistemas().subscribe((res: Sistema[]) => {
      this.sistemas = res;
    });
  }

  getUsersForPage(): Sistema[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.sistemas.slice(startIndex, endIndex);
  }
  getTotalPages(): number {
    return Math.ceil(this.sistemas.length / this.itemsPerPage);
  }

  getPages(): number[] {
    return Array(this.getTotalPages())
      .fill(0)
      .map((_, index) => index + 1);
  }


  getSistema(id) {
    this.crudService.getSistema(id).subscribe((res: Sistema[]) => {
      this.sistema = res;
    });
  }

  modificar() {
    const sistema: Sistema = {
      Id: this.sistema[0].Id,
      Nombre: this.sistema[0].Nombre,
      Activo: false,
    };
    this.crudService.modificarSistema(sistema).subscribe(
      (res) => {
        localStorage.setItem('mensaje', res.message);
        window.location.reload();
      },
      (error) => {}
    );
  }

  DesactivaroActivar(sistemas) {
    let id = sistemas.Id;
  
    if (sistemas.Activo === true) {
      this.crudService.eliminarSistema(id).subscribe(
        (res) => {
          localStorage.setItem('mensaje', res.message);
          window.location.reload();
        },
        (error) => {
          console.error('Error al desactivar:', error);
        }
      );
    } else {
      this.crudService.activarSistema(id).subscribe(
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
