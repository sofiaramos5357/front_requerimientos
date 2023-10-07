import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-elementos-editar-documento',
  templateUrl: './elementos-editar-documento.component.html',
  styleUrls: ['./elementos-editar-documento.component.css']
})
export class ElementosEditarDocumentoComponent implements OnInit {

  constructor(private crudService: CrudService, private router: Router, private datosUsuarioService: DatosUsuarioService) { }

  datosUsuario: Usuario
  documentosEdicion=[]

  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1;  // Página actual

  ngOnInit() {
    this.DatosUsuario()

  }

  DatosUsuario() {
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
        this.datosUsuario = response[0];
        this.DocumentosEdicion(this.datosUsuario.Id)
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  DocumentosEdicion(Id) {
    this.crudService.getDocumentosEdicion(Id).subscribe((res: any[]) => {
      this.documentosEdicion = res      
      console.log(this.documentosEdicion)
    });
}

getUsersForPage(): any[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.documentosEdicion.slice(startIndex, endIndex);
}
getTotalPages(): number {
  return Math.ceil(this.documentosEdicion.length / this.itemsPerPage);
}

getPages(): number[] {
  return Array(this.getTotalPages()).fill(0).map((_, index) => index + 1);
}




abrirPDF(Nombre): void {
 const pdfUrl = `http://localhost:8090/${Nombre}`;

  window.open(pdfUrl, '_blank');
}


eliminarDocumento(Id){
  //console.log(this.datosRuta)
  this.crudService.eliminarDocumento(Id).subscribe(
    res => {
      this.router.navigate(['/home']);
      alertifyjs.success(res.message)
    },
    (error) => {
    }
  );
}

}
