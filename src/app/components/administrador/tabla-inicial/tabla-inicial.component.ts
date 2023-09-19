import { Component, OnInit } from '@angular/core';
import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { Usuario } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-tabla-inicial',
  templateUrl: './tabla-inicial.component.html',
  styleUrls: ['./tabla-inicial.component.css']
})
export class TablaInicialComponent implements OnInit {
  
  constructor(private crudService: CrudService,private router: Router,private datosUsuarioService: DatosUsuarioService) { }

  requerimientos: RequerimientoCreado[] = [];

  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1;  // Página actual

  datosUsuario: Usuario



  ngOnInit(): void {
    this.requerimientosCreadod()
    this.DatosUsuario()
  }

  requerimientosCreadod() {
      this.crudService.getRequerimientoscreadas().subscribe((res: RequerimientoCreado[]) => {
        // Filtrar los elementos que no tienen estadoId igual a 5 o 6
        this.requerimientos = res.filter(requerimiento => requerimiento.RequerimientoEstadoId !== 5 && requerimiento.RequerimientoEstadoId !== 6);
      });
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

  verRequerimiento(requerimiento) {
    if (requerimiento !== null && requerimiento !== undefined) {
      if(this.datosUsuario.Id !== requerimiento.UsuarioIdCreador || requerimiento.RequerimientoEstadoId!==1){ 
      this.router.navigate(['/visualizarreq'], {
        queryParams: { requerimiento: JSON.stringify(requerimiento) }
      });
    }
    if(this.datosUsuario.Id === requerimiento.UsuarioIdCreador && requerimiento.RequerimientoEstadoId===1){
      this.router.navigate(['/editarrequerimiento'], {
        queryParams: { requerimiento: JSON.stringify(requerimiento)
      }});
    }
    } else {
      console.error("El objeto 'requerimiento' está vacío o no está definido.");
    }
  }

  DatosUsuario() {
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
        this.datosUsuario = response[0];
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }


  //datosComplementarios(){}
}
