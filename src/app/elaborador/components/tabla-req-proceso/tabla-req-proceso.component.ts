import { Component, OnInit } from '@angular/core';

import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-tabla-req-proceso',
  templateUrl: './tabla-req-proceso.component.html',
  styleUrls: ['./tabla-req-proceso.component.css'],
})
export class TablaReqProcesoComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private router: Router,
    private datosUsuarioService: DatosUsuarioService
  ) {}

  requerimientosProcesos: RequerimientoCreado[] = []; // Arreglo para almacenar los requerimientos en proceso

  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1; // Página actual
  
  datosUsuario: Usuario; // Variable para almacenar los datos del usuario
  
  mensaje: string = 'No hay requerimientos en proceso.'; // Variable para almacenar el mensaje a mostrar en el modal
  
  ngOnInit(): void {
    this.DatosUsuario(); // Llama a la función para obtener los datos del usuario al inicializar el componente
  }
  
  requerimientosProceso(Id) {
    // Obtiene los requerimientos en proceso asignados al usuario con el ID especificado
    this.crudService
      .getRequerimientosProceso(Id)
      .subscribe((res: RequerimientoCreado[]) => {
        this.requerimientosProcesos = res;
      });
  }
  
  getUsersForPage(): RequerimientoCreado[] {
    // Obtiene los requerimientos en proceso para la página actual
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.requerimientosProcesos.slice(startIndex, endIndex);
  }
  
  getTotalPages(): number {
    // Calcula el número total de páginas en función de la cantidad de requerimientos en proceso
    return Math.ceil(this.requerimientosProcesos.length / this.itemsPerPage);
  }
  
  getPages(): number[] {
    // Obtiene un arreglo de números que representan las páginas disponibles
    return Array(this.getTotalPages())
      .fill(0)
      .map((_, index) => index + 1);
  }
  
  modificarRequerimiento(requerimientosProcesos) {
    if (
      requerimientosProcesos !== null &&
      requerimientosProcesos !== undefined
    ) {
      if (
        this.datosUsuario.Id !== requerimientosProcesos.UsuarioIdCreador ||
        requerimientosProcesos.RequerimientoEstadoId !== 1
      ) {
        // Navega a la página de modificación de la ficha técnica si se cumplen las condiciones
        this.router.navigate(['/modificarficha'], {
          queryParams: {
            requerimiento: JSON.stringify(requerimientosProcesos.Id),
          },
        });
      }
    } else {
      console.error("El objeto 'requerimiento' está vacío o no está definido.");
    }
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
  
  enviarReq(requerimiento) {
    if (requerimiento !== null && requerimiento !== undefined) {
      if (
        this.datosUsuario.Id !== requerimiento.UsuarioIdCreador ||
        requerimiento.RequerimientoEstadoId !== 1
      ) {
        // Navega a la página de detalles del requerimiento si se cumplen las condiciones
        this.router.navigate(['/reqdetalle'], {
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
        this.requerimientosProceso(this.datosUsuario.Id);
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }
  
}
