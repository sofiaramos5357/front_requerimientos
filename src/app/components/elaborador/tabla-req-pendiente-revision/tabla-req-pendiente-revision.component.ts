import { Component, OnInit } from '@angular/core';

import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-tabla-req-pendiente-revision',
  templateUrl: './tabla-req-pendiente-revision.component.html',
  styleUrls: ['./tabla-req-pendiente-revision.component.css'],
})
export class TablaReqPendienteRevisionComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private router: Router,
    private datosUsuarioService: DatosUsuarioService
  ) {}

  datosUsuario: Usuario;

  reqPendientesRev: RequerimientoCreado[] = [];

  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1; // Página actual

  ngOnInit(): void {
    this.DatosUsuario();
  }

  DatosUsuario() {
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
        this.datosUsuario = response[0];
        //console.log(this.datosUsuario.Id);
        this.pendientesRevision(this.datosUsuario.Id);
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  pendientesRevision(Id) {
    this.crudService
      .getPendienteRevisar(Id)
      .subscribe((res: RequerimientoCreado[]) => {        
        this.reqPendientesRev = res;
      });
  }

  getUsersForPage(): RequerimientoCreado[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.reqPendientesRev.slice(startIndex, endIndex);
  }
  getTotalPages(): number {
    return Math.ceil(this.reqPendientesRev.length / this.itemsPerPage);
  }

  getPages(): number[] {
    return Array(this.getTotalPages())
      .fill(0)
      .map((_, index) => index + 1);
  }

}
