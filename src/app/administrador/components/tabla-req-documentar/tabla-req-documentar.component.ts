// Importación de módulos y clases necesarios
import { Component, OnInit } from '@angular/core';
import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

// Declaración del componente
@Component({
  selector: 'app-tabla-req-documentar',
  templateUrl: './tabla-req-documentar.component.html',
  styleUrls: ['./tabla-req-documentar.component.css']
})
export class TablaReqDocumentarComponent implements OnInit {

  // Constructor del componente que inyecta los servicios y clases necesarios
  constructor(private crudService: CrudService, private router: Router, private datosUsuarioService: DatosUsuarioService) { }

  // Declaración de variables de clase
  requerimientosaDocumentar: RequerimientoCreado[] = [];

  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1;  // Página actual

  datosUsuario: Usuario

  mensaje: string='No hay requerimientos por documentar.'; // Variable para almacenar la palabra a mostrar en el modal

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.DatosUsuario()
  }

  // Función para obtener requerimientos a documentar según el ID del usuario
  requerimientosADocumentar(Id) {
    this.crudService.getRequerimientosADocumentar(Id).subscribe((res: RequerimientoCreado[]) => {      
      this.requerimientosaDocumentar = res      
    });
  }

  // Función para obtener un subconjunto de requerimientos para mostrar en la página actual
  getUsersForPage(): RequerimientoCreado[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.requerimientosaDocumentar.slice(startIndex, endIndex);
  }

  // Función para calcular el número total de páginas según la cantidad de requerimientos
  getTotalPages(): number {
    return Math.ceil(this.requerimientosaDocumentar.length / this.itemsPerPage);
  }

  // Función para generar un array con números de página para la paginación
  getPages(): number[] {
    return Array(this.getTotalPages()).fill(0).map((_, index) => index + 1);
  }

  // Función para obtener los datos del usuario actual
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

  // Función para enviar un requerimiento a la página de documentación
  enviarRequerimiento(requerimiento) {
    if (requerimiento !== null && requerimiento !== undefined) {
      if (this.datosUsuario.Id !== requerimiento.UsuarioIdCreador || requerimiento.RequerimientoEstadoId !== 1) { 
        this.router.navigate(['/documentar'], {
          queryParams: { requerimiento: JSON.stringify(requerimiento) }
        });
      }
    } else {
      console.error("El objeto 'requerimiento' está vacío o no está definido.");
    }
  }
}
