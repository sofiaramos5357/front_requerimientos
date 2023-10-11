import { Component, OnInit } from '@angular/core';
import * as alertifyjs from 'alertifyjs';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { TipoObjeto } from 'src/app/models/tipo-objeto.model';

@Component({
  selector: 'app-tabla-objeto',
  templateUrl: './tabla-objeto.component.html',
  styleUrls: ['./tabla-objeto.component.css'],
})
export class TablaObjetoComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private router: Router,
    private datosUsuarioService: DatosUsuarioService
  ) {}

  tipoObjetos: TipoObjeto[] = [];

  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1; // Página actual


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
    this.getTipoObjetos();
    this.mensajeAlmacenado();
  }

  getTipoObjetos() {
    this.crudService.getTipoObjetos().subscribe((res: TipoObjeto[]) => {
      this.tipoObjetos = res;
    });
  }

  getUsersForPage(): TipoObjeto[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.tipoObjetos.slice(startIndex, endIndex);
  }
  getTotalPages(): number {
    return Math.ceil(this.tipoObjetos.length / this.itemsPerPage);
  }

  getPages(): number[] {
    return Array(this.getTotalPages())
      .fill(0)
      .map((_, index) => index + 1);
  }

  tipoObjeto: TipoObjeto[] = [];

  getTipoObjeto(id) {
    this.crudService.getTipoObjeto(id).subscribe((res: TipoObjeto[]) => {
      this.tipoObjeto = res;
    });
  }

  modificar() {
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
