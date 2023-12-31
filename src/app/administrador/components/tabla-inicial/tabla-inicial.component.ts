import { Component, OnInit } from '@angular/core';
import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-tabla-inicial',
  templateUrl: './tabla-inicial.component.html',
  styleUrls: ['./tabla-inicial.component.css'],
})
export class TablaInicialComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private router: Router,
    private datosUsuarioService: DatosUsuarioService
  ) {}

  requerimientos: RequerimientoCreado[] = []; // Arreglo para almacenar los requerimientos creados

  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1; // Página actual

  datosUsuario: Usuario;

  mensaje: string = 'No hay requerimientos en proceso.'; // Variable para almacenar un mensaje por defecto en el modal

  ngOnInit(): void {
    // Se ejecutan las siguientes funciones al inicializar el componente
    this.requerimientosCreadod(); // Obtiene los requerimientos creados
    this.DatosUsuario(); // Obtiene los datos del usuario actual
  }

  requerimientosCreadod() {
    // Obtiene los requerimientos creados a través del servicio 'crudService'
    this.crudService
      .getRequerimientoscreadas()
      .subscribe((res: RequerimientoCreado[]) => {
        this.requerimientos = res;
      });
  }

  getUsersForPage(): RequerimientoCreado[] {
    // Obtiene un subconjunto de requerimientos para mostrar en la página actual
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.requerimientos.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    // Calcula el número total de páginas en función del número de requerimientos y elementos por página
    return Math.ceil(this.requerimientos.length / this.itemsPerPage);
  }

  getPages(): number[] {
    // Genera un array con números de página para la paginación
    return Array(this.getTotalPages())
      .fill(0)
      .map((_, index) => index + 1);
  }

  verRequerimiento(requerimiento) {
    if (requerimiento !== null && requerimiento !== undefined) {
      // Verifica el usuario y el estado del requerimiento para determinar la acción de navegación
      if (
        this.datosUsuario.Id !== requerimiento.UsuarioIdCreador ||
        requerimiento.RequerimientoEstadoId !== 1
      ) {
        // Navega a la visualización del requerimiento si el usuario no es el creador o el estado no es "en proceso"
        this.router.navigate(['/visualizarreq'], {
          queryParams: { requerimiento: JSON.stringify(requerimiento) },
        });
      }
      if (
        this.datosUsuario.Id === requerimiento.UsuarioIdCreador &&
        requerimiento.RequerimientoEstadoId === 1
      ) {
        // Navega a la edición del requerimiento si el usuario es el creador y el estado es "en proceso"
        this.router.navigate(['/editarrequerimiento'], {
          queryParams: { requerimiento: JSON.stringify(requerimiento) },
        });
      }
    } else {
      console.error("El objeto 'requerimiento' está vacío o no está definido.");
    }
  }

  DatosUsuario() {
    // Obtiene los datos del usuario actual a través del servicio 'datosUsuarioService'
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
        this.datosUsuario = response[0];
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }
}
