// Importación de módulos y clases necesarios
import { Component, OnInit } from '@angular/core';
import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

// Declaración del componente
@Component({
  selector: 'app-tabla-revisar',
  templateUrl: './tabla-revisar.component.html',
  styleUrls: ['./tabla-revisar.component.css'],
})
export class TablaRevisarComponent implements OnInit {
  // Constructor del componente que inyecta los servicios y clases necesarios
  constructor(
    private crudService: CrudService,
    private router: Router,
    private datosUsuarioService: DatosUsuarioService
  ) {}

  // Declaración de variables de clase
  requerimientosaRevisar: RequerimientoCreado[] = [];

  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1; // Página actual

  datosUsuario: Usuario;

  mensaje: string = 'No hay requerimientos por revisar.'; // Variable para almacenar la palabra a mostrar en el modal

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.DatosUsuario();
  }

  // Función para obtener requerimientos a revisar según el ID del usuario
  requerimientosARevisar(Id) {
    this.crudService
      .getRequerimientosARevisar(Id)
      .subscribe((res: RequerimientoCreado[]) => {
        // Filtrar los elementos que no tienen estadoId igual a 5 o 6
        this.requerimientosaRevisar = res;
      });
  }

  // Función para obtener un subconjunto de requerimientos para mostrar en la página actual
  getUsersForPage(): RequerimientoCreado[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.requerimientosaRevisar.slice(startIndex, endIndex);
  }
  // Función para calcular el número total de páginas según la cantidad de requerimientos
  getTotalPages(): number {
    return Math.ceil(this.requerimientosaRevisar.length / this.itemsPerPage);
  }

  // Función para generar un array con números de página para la paginación
  getPages(): number[] {
    return Array(this.getTotalPages())
      .fill(0)
      .map((_, index) => index + 1);
  }

  // Función para obtener los datos del usuario actual
  DatosUsuario() {
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
        this.datosUsuario = response[0];
        this.requerimientosARevisar(this.datosUsuario.Id);
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  // Función para enviar un requerimiento a la página de ingreso de revisión
  enviarRequerimiento(requerimiento) {
    if (requerimiento !== null && requerimiento !== undefined) {
      if (
        this.datosUsuario.Id !== requerimiento.UsuarioIdCreador ||
        requerimiento.RequerimientoEstadoId !== 1
      ) {
        this.router.navigate(['/ingresarrevision'], {
          queryParams: { requerimiento: JSON.stringify(requerimiento) },
        });
      }
    } else {
      console.error("El objeto 'requerimiento' está vacío o no está definido.");
    }
  }
}
