import { Component, OnInit } from '@angular/core';
import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-tabla-req-documentar',
  templateUrl: './tabla-req-documentar.component.html',
  styleUrls: ['./tabla-req-documentar.component.css']
})
export class TablaReqDocumentarComponent implements OnInit {
  
  constructor(private crudService: CrudService,private router: Router,private datosUsuarioService: DatosUsuarioService) { }

  requerimientosaDocumentar: RequerimientoCreado[] = [];

  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1;  // Página actual

  datosUsuario: Usuario

  ngOnInit(): void {
    this.DatosUsuario()
  }

  requerimientosADocumentar(Id) {
    this.crudService.getRequerimientosADocumentar(Id).subscribe((res: RequerimientoCreado[]) => {
      // Filtrar los elementos que no tienen estadoId igual a 5 o 6
      this.requerimientosaDocumentar = res
    });
}

getUsersForPage(): RequerimientoCreado[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.requerimientosaDocumentar.slice(startIndex, endIndex);
}
getTotalPages(): number {
  return Math.ceil(this.requerimientosaDocumentar.length / this.itemsPerPage);
}

getPages(): number[] {
  return Array(this.getTotalPages()).fill(0).map((_, index) => index + 1);
}

  DatosUsuario() {
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
        this.datosUsuario = response[0];
        this.requerimientosADocumentar(this.datosUsuario.Id)
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  enviarRequerimiento(requerimiento) {
    if (requerimiento !== null && requerimiento !== undefined) {
      if(this.datosUsuario.Id !== requerimiento.UsuarioIdCreador || requerimiento.RequerimientoEstadoId!==1){ 
      this.router.navigate(['/documentar'], {
        queryParams: { requerimiento: JSON.stringify(requerimiento) }
      });
    }

    } else {
      console.error("El objeto 'requerimiento' está vacío o no está definido.");
    }
  }

}
