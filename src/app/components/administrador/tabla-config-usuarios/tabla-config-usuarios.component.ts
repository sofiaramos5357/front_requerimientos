import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/models/rol.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CrudService } from 'src/app/services/crud.service';
import * as alertifyjs from 'alertifyjs';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tabla-config-usuarios',
  templateUrl: './tabla-config-usuarios.component.html',
  styleUrls: ['./tabla-config-usuarios.component.css']
})
export class TablaConfigUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  roles: Rol[] = [];
  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1;  // Página actual

  modelDatos: any = {};


  usuarioActual: any = {}; // Usuario actual que se está editando
  copiaUsuarioOriginal: any; // Copia temporal de los datos originales del usuario

  datosUsuario: Usuario;

  constructor(private crudService: CrudService,private datosUsuarioService:DatosUsuarioService) {
  }
  ngOnInit(): void {

    this.obtenerUsuarios()
    this.obtenerRoles()
    this.mensajeAlmacenado()
    this.DatosUsuario()
  }

  obtenerUsuarios(){
    this.crudService.getUsuarios().subscribe((res: Usuario[]) => {
      //console.log(res);
      this.usuarios = res
    })
  }

  obtenerRoles(){
    this.crudService.getRoles().subscribe((res: Rol[]) => {
      //console.log(res);
      this.roles = res
    })
  }

  mensajeAlmacenado(){
    // Verificar si hay un mensaje almacenado en el almacenamiento local
    const mensaje = localStorage.getItem('mensaje');
    if (mensaje) {
      // Mostrar el mensaje con alertify o cualquier otro mecanismo de notificación
      alertifyjs.success(mensaje);

      // Limpiar el mensaje del almacenamiento local
      localStorage.removeItem('mensaje');
    }
  }

  getUsersForPage(): Usuario[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.usuarios.slice(startIndex, endIndex);
  }
  getTotalPages(): number {
    return Math.ceil(this.usuarios.length / this.itemsPerPage);
  }

  getPages(): number[] {
    return Array(this.getTotalPages()).fill(0).map((_, index) => index + 1);
  }


  // Función para abrir el modal y copiar los datos originales
  abrirModal(usuario: any) {
    this.usuarioActual = { ...usuario };
    this.copiaUsuarioOriginal = { ...usuario };
    // Lógica para abrir el modal
  }

  // Función para restaurar los datos originales en caso de cancelación
  cerrarModal() {
    if (this.copiaUsuarioOriginal) {
      this.usuarioActual.Activo = this.copiaUsuarioOriginal.Activo;
      this.usuarioActual.RolId = this.copiaUsuarioOriginal.RolId;
    }
  }
  DatosUsuario(){
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
    this.crudService.modificarUsuario(this.usuarioActual).subscribe(
      (res) => {
        // Manejar la respuesta exitosa aquí, si es necesario
        //console.log('Usuario modificado exitosamente', response);

        // Almacenar el mensaje en el almacenamiento local antes de recargar
        localStorage.setItem('mensaje', res.message);

        //si el mismo se cambia el rol salir del usuario admin
        if(this.usuarioActual.Id===this.datosUsuario.Id){
          localStorage.removeItem('mensaje');
          localStorage.removeItem('token');
          window.location.reload();
        }else{
        // Recargar la página
        window.location.reload();}
      },
      (error) => {
        // Manejar errores aquí, si es necesario
        //console.error('Error al modificar usuario', error);
      }
    );
  }
}
