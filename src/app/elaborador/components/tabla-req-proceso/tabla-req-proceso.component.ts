import { Component, OnInit } from '@angular/core';

import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-tabla-req-proceso',
  templateUrl: './tabla-req-proceso.component.html',
  styleUrls: ['./tabla-req-proceso.component.css'],
})
export class TablaReqProcesoComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private router: Router,
    private datosUsuarioService: DatosUsuarioService
  ) {}

  requerimientosProcesos: RequerimientoCreado[] = [];

  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1; // Página actual

  datosUsuario: Usuario;

  ngOnInit(): void {
    this.DatosUsuario();
  }

  requerimientosProceso(Id) {
    this.crudService
      .getRequerimientosProceso(Id)
      .subscribe((res: RequerimientoCreado[]) => {
        this.requerimientosProcesos = res;
      });
  }

  getUsersForPage(): RequerimientoCreado[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.requerimientosProcesos.slice(startIndex, endIndex);
  }
  getTotalPages(): number {
    return Math.ceil(this.requerimientosProcesos.length / this.itemsPerPage);
  }

  getPages(): number[] {
    return Array(this.getTotalPages())
      .fill(0)
      .map((_, index) => index + 1);
  }

  modificarRequerimiento(requerimientosProcesos) {
    if (
      requerimientosProcesos !== null &&
      requerimientosProcesos !== undefined
    ) {
      if (
        this.datosUsuario.Id !== requerimientosProcesos.UsuarioIdCreador ||
        requerimientosProcesos.RequerimientoEstadoId !== 1
      ) {
        this.router.navigate(['/modificarficha'], {
          queryParams: {
            requerimiento: JSON.stringify(requerimientosProcesos.Id),
          },
        });
      }
    } else {
      console.error("El objeto 'requerimiento' está vacío o no está definido.");
    }
  }

  verRequerimiento(requerimiento) {
    if (requerimiento !== null && requerimiento !== undefined) {
      if (
        this.datosUsuario.Id !== requerimiento.UsuarioIdCreador ||
        requerimiento.RequerimientoEstadoId !== 1
      ) {
        this.router.navigate(['/requerimientoasignado'], {
          queryParams: { requerimiento: JSON.stringify(requerimiento) },
        });
      }
    } else {
      console.error("El objeto 'requerimiento' está vacío o no está definido.");
    }
  }

  enviarReq(requerimiento) {
    if (requerimiento !== null && requerimiento !== undefined) {
      if (
        this.datosUsuario.Id !== requerimiento.UsuarioIdCreador ||
        requerimiento.RequerimientoEstadoId !== 1
      ) {
        this.router.navigate(['/reqdetalle'], {
          queryParams: { requerimiento: JSON.stringify(requerimiento) },
        });
      }
    } else {
      console.error("El objeto 'requerimiento' está vacío o no está definido.");
    }
  }

  DatosUsuario() {
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
        this.datosUsuario = response[0];
        //console.log(this.datosUsuario.Id);
        this.requerimientosProceso(this.datosUsuario.Id);
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }
}
