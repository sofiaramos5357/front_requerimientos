import { Component, OnInit } from '@angular/core';
import * as alertifyjs from 'alertifyjs';
import { CrudService } from 'src/app/services/crud.service';
import { TipoCambio } from 'src/app/models/tipo-cambio.model';

@Component({
  selector: 'app-tabla-tipo-cambio',
  templateUrl: './tabla-tipo-cambio.component.html',
  styleUrls: ['./tabla-tipo-cambio.component.css']
})
export class TablaTipoCambioComponent implements OnInit {
  constructor(
    private crudService: CrudService,
  
  ) {}

  tipoCambios: TipoCambio[] = [];

  itemsPerPage: number = 5; // Número de elementos por página
  currentPage: number = 1; // Página actual

  tipoCambio: TipoCambio[] = [];


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
    this.getTipoCambios();
    this.mensajeAlmacenado();
  }

  getTipoCambios() {
    this.crudService.getTipoCambios().subscribe((res: TipoCambio[]) => {
      this.tipoCambios = res;
    });
  }

  getUsersForPage(): TipoCambio[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.tipoCambios.slice(startIndex, endIndex);
  }
  getTotalPages(): number {
    return Math.ceil(this.tipoCambios.length / this.itemsPerPage);
  }

  getPages(): number[] {
    return Array(this.getTotalPages())
      .fill(0)
      .map((_, index) => index + 1);
  }


  getTipoCambio(id) {
    this.crudService.getTipoCambio(id).subscribe((res: TipoCambio[]) => {
      this.tipoCambio = res;
      console.log(this.tipoCambio);
      
    });
  }

  modificar() {
    const tipoCambio: TipoCambio = {
      Id: this.tipoCambio[0].Id,
      Nombre: this.tipoCambio[0].Nombre,
      Activo: false,
    };
    this.crudService.modificarTipoCambio(tipoCambio).subscribe(
      (res) => {
        localStorage.setItem('mensaje', res.message);
        window.location.reload();
      },
      (error) => {}
    );
  }

  DesactivaroActivar(tipoCambio) {
    let id = tipoCambio.Id;
  
    if (tipoCambio.Activo === true) {
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
