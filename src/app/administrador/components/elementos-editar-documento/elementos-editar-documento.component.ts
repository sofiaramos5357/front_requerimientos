import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-elementos-editar-documento',
  templateUrl: './elementos-editar-documento.component.html',
  styleUrls: ['./elementos-editar-documento.component.css'],
})
export class ElementosEditarDocumentoComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private router: Router,
    private datosUsuarioService: DatosUsuarioService
  ) {}

  // Declaración de variables miembro
  datosUsuario: Usuario; // Variable para almacenar datos del usuario
  documentosEdicion = []; // Arreglo para almacenar documentos de edición

  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1; // Página actual

  mensaje: string = 'No hay documentos por modificar.'; // Variable para almacenar la palabra a mostrar en el modal

  ngOnInit() {
    // Método que se ejecuta cuando se inicializa el componente
    this.DatosUsuario(); // Llama a la función para obtener datos del usuario
  }

  DatosUsuario() {
    // Función para obtener datos del usuario a través del servicio
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
        this.datosUsuario = response[0]; // Almacena los datos del usuario
        this.DocumentosEdicion(this.datosUsuario.Id); // Llama a la función para obtener documentos de edición
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  DocumentosEdicion(Id) {
    // Función para obtener documentos de edición a través del servicio CRUD
    this.crudService.getDocumentosEdicion(Id).subscribe((res: any[]) => {
      this.documentosEdicion = res; // Almacena los documentos de edición
    });
  }

  getUsersForPage(): any[] {
    // Función para obtener los documentos de edición para la página actual
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.documentosEdicion.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    // Función para calcular el número total de páginas en función de la cantidad de documentos
    return Math.ceil(this.documentosEdicion.length / this.itemsPerPage);
  }

  getPages(): number[] {
    // Función para obtener un arreglo de números que representa las páginas disponibles
    return Array(this.getTotalPages())
      .fill(0)
      .map((_, index) => index + 1);
  }

  abrirPDF(Nombre): void {
    // Función para abrir un documento PDF en una nueva ventana o pestaña del navegador
    const pdfUrl = `http://localhost:8090/${Nombre}`;
    window.open(pdfUrl, '_blank');
  }

  eliminarDocumento(Id) {
    // Función para eliminar un documento a través del servicio CRUD
    this.crudService.eliminarDocumento(Id).subscribe(
      (res) => {
        this.router.navigate(['/home/admin']); // Navega a la página de inicio del administrador
        alertifyjs.success(res.message); // Muestra una notificación de éxito
      },
      (error) => {
        // Maneja cualquier error que ocurra al eliminar el documento
      }
    );
  }
}
