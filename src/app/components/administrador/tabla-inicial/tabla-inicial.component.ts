import { Component, OnInit } from '@angular/core';
import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { RequerimientoEstado } from 'src/app/models/requerimiento-estado.model';
import { Sistema } from 'src/app/models/sistema.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabla-inicial',
  templateUrl: './tabla-inicial.component.html',
  styleUrls: ['./tabla-inicial.component.css']
})
export class TablaInicialComponent implements OnInit {

  requerimientos: RequerimientoCreado[] = [];

  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1;  // Página actual

  sistemas: Sistema[] = []
  estado: RequerimientoEstado[] = []
  usuarios: Usuario[] = []

  constructor(private crudService: CrudService,private router: Router) { }

  ngOnInit(): void {
    this.requerimientosCreadod()
    this.obtenerSistemas()
    this.obtenerEstado()
    this.obtenerUsuarios()
  }

  requerimientosCreadod() {
    this.crudService.getRequerimientoscreadas().subscribe((res: RequerimientoCreado[]) => {
      //console.log(res);
      this.requerimientos = res
    })
  }
  getUsersForPage(): RequerimientoCreado[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.requerimientos.slice(startIndex, endIndex);
  }
  getTotalPages(): number {
    return Math.ceil(this.requerimientos.length / this.itemsPerPage);
  }

  getPages(): number[] {
    return Array(this.getTotalPages()).fill(0).map((_, index) => index + 1);
  }

  obtenerSistemas() {
    this.crudService.getSistemas().subscribe((res: Sistema[]) => {
      //console.log(res);
      this.sistemas = res
    })
  }
  obtenerEstado() {
    this.crudService.getRequerimientosEstados().subscribe((res: RequerimientoEstado[]) => {
      //console.log(res);
      this.estado = res
    })
  }
  obtenerUsuarios() {
    this.crudService.getUsuarios().subscribe((res: Usuario[]) => {
      //console.log(res);
      this.usuarios = res
    })
  }
  verRequerimiento(requerimiento) {
    //console.log(requerimiento);

    if (requerimiento !== null && requerimiento !== undefined) {
      this.router.navigate(['/visualizarreq'], {
        queryParams: { requerimiento: JSON.stringify(requerimiento) }
      });
    } else {
      console.error("El objeto 'requerimiento' está vacío o no está definido.");
    }
  }

  //datosComplementarios(){}
}
