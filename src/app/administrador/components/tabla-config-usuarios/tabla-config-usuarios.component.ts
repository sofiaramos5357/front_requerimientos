import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/models/rol.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CrudService } from 'src/app/services/crud.service';
import * as alertifyjs from 'alertifyjs';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';

@Component({
  selector: 'app-tabla-config-usuarios',
  templateUrl: './tabla-config-usuarios.component.html',
  styleUrls: ['./tabla-config-usuarios.component.css'],
})
export class TablaConfigUsuariosComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private datosUsuarioService: DatosUsuarioService
  ) {}

  usuarios: Usuario[] = [];
  roles: Rol[] = [];
  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1; // Página actual

  modelDatos: any = {};

  usuarioActual: any = {}; // Usuario actual que se está editando
  copiaUsuarioOriginal: any; // Copia temporal de los datos originales del usuario

  datosUsuario: Usuario;

  ngOnInit(): void {
    // Al iniciar el componente, se ejecutan las siguientes funciones
    this.obtenerUsuarios(); // Obtiene la lista de usuarios
    this.obtenerRoles(); // Obtiene la lista de roles
    this.mensajeAlmacenado(); // Comprueba si hay un mensaje almacenado en el almacenamiento local
    this.DatosUsuario(); // Obtiene los datos del usuario actual
  }

  obtenerUsuarios() {
    // Obtiene la lista de usuarios a través del servicio 'crudService'
    this.crudService.getUsuarios().subscribe((res: Usuario[]) => {
      this.usuarios = res;
    });
  }

  obtenerRoles() {
    // Obtiene la lista de roles a través del servicio 'crudService'
    this.crudService.getRoles().subscribe((res: Rol[]) => {
      this.roles = res;
    });
  }

  mensajeAlmacenado() {
    // Comprueba si hay un mensaje almacenado en el almacenamiento local
    const mensaje = localStorage.getItem('mensaje');
    if (mensaje) {
      // Muestra el mensaje de éxito utilizando alertify o un mecanismo similar
      alertifyjs.success(mensaje);

      // Limpia el mensaje del almacenamiento local
      localStorage.removeItem('mensaje');
    }
  }

  getUsersForPage(): Usuario[] {
    // Obtiene un subconjunto de usuarios para mostrar en la página actual
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.usuarios.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    // Calcula el número total de páginas en función del número de usuarios y elementos por página
    return Math.ceil(this.usuarios.length / this.itemsPerPage);
  }

  getPages(): number[] {
    // Genera un array con números de página para la paginación
    return Array(this.getTotalPages())
      .fill(0)
      .map((_, index) => index + 1);
  }

  abrirModal(usuario: any) {
    // Abre un modal para editar un usuario y crea una copia de los datos originales
    this.usuarioActual = { ...usuario };
    this.copiaUsuarioOriginal = { ...usuario };
    // Lógica para abrir el modal
  }

  cerrarModal() {
    // Función para restaurar los datos originales en caso de cancelación
    if (this.copiaUsuarioOriginal) {
      this.usuarioActual.Activo = this.copiaUsuarioOriginal.Activo;
      this.usuarioActual.RolId = this.copiaUsuarioOriginal.RolId;
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

  guardarCambios() {
    // Guarda los cambios realizados en el usuario actual a través del servicio 'crudService'
    this.crudService.modificarUsuario(this.usuarioActual).subscribe(
      (res) => {
        // Maneja la respuesta exitosa aquí, almacenando un mensaje en el almacenamiento local
        localStorage.setItem('mensaje', res.message);

        if (this.usuarioActual.Id === this.datosUsuario.Id) {
          // Si se modifica el rol del usuario actual, se realiza un reinicio de la sesión
          localStorage.removeItem('mensaje');
          localStorage.removeItem('token');
          window.location.reload();
        } else {
          // Recarga la página para reflejar los cambios
          window.location.reload();
        }
      },
      (error) => {
        // Maneja errores aquí, si es necesario
        //console.error('Error al modificar usuario', error);
      }
    );
  }
}
