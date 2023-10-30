import { Component, OnInit } from '@angular/core';

import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-tabla-inicial-elab',
  templateUrl: './tabla-inicial-elab.component.html',
  styleUrls: ['./tabla-inicial-elab.component.css'],
})
export class TablaInicialElabComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private router: Router,
    private datosUsuarioService: DatosUsuarioService
  ) {}

  requerimientos: RequerimientoCreado[] = []; // Arreglo para almacenar los requerimientos asignados

  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1; // Página actual
  
  datosUsuario: Usuario; // Variable para almacenar los datos del usuario
  
  mensaje: string = 'No hay requerimientos asignados.'; // Variable para almacenar el mensaje a mostrar en el modal
  
  ngOnInit(): void {
    this.DatosUsuario(); // Llama a la función para obtener los datos del usuario al inicializar el componente
  }
  
  requerimientosAsignados(Id) {
    // Obtiene los requerimientos asignados al usuario con el ID especificado
    this.crudService
      .getRequerimientosAsignados(Id)
      .subscribe((res: RequerimientoCreado[]) => {
        this.requerimientos = res;
      });
  }
  
  getUsersForPage(): RequerimientoCreado[] {
    // Obtiene los requerimientos para la página actual
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.requerimientos.slice(startIndex, endIndex);
  }
  
  getTotalPages(): number {
    // Calcula el número total de páginas en función de la cantidad de requerimientos
    return Math.ceil(this.requerimientos.length / this.itemsPerPage);
  }
  
  getPages(): number[] {
    // Obtiene un arreglo de números que representan las páginas disponibles
    return Array(this.getTotalPages())
      .fill(0)
      .map((_, index) => index + 1);
  }
  
  verRequerimiento(requerimiento) {
    if (requerimiento !== null && requerimiento !== undefined) {
      if (
        this.datosUsuario.Id !== requerimiento.UsuarioIdCreador ||
        requerimiento.RequerimientoEstadoId !== 1
      ) {
        // Navega a la página de requerimiento asignado si se cumplen las condiciones
        this.router.navigate(['/requerimientoasignado'], {
          queryParams: { requerimiento: JSON.stringify(requerimiento) },
        });
      }
    } else {
      console.error("El objeto 'requerimiento' está vacío o no está definido.");
    }
  }
  
  DatosUsuario() {
    // Obtiene los datos del usuario y los almacena en datosUsuario
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
        this.datosUsuario = response[0];
        this.requerimientosAsignados(this.datosUsuario.Id);
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }
  
}
