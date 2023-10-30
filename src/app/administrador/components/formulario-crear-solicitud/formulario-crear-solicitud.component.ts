import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';
import { Sistema } from 'src/app/models/sistema.model';
import { Usuario } from 'src/app/models/usuario.model';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { CrearRequerimiento } from 'src/app/models/crear-requerimiento.model';
@Component({
  selector: 'app-formulario-crear-solicitud',
  templateUrl: './formulario-crear-solicitud.component.html',
  styleUrls: ['./formulario-crear-solicitud.component.css'],
})
export class FormularioCrearSolicitudComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private router: Router,
    private datosUsuarioService: DatosUsuarioService
  ) {}

  sistemas: Sistema[]; // Arreglo para almacenar sistemas
  usuarios: Usuario[]; // Arreglo para almacenar usuarios
  
  requerimiento = {
    SistemaId: 0,
    UsuarioIdElaborador: 0,
    Descripcion: '',
    Objetivo: '',
    UsuarioIdCreador: 0,
    FechaCreacion: new Date(),
  }; // Objeto para almacenar los datos de un requerimiento
  
  DatosUsuario: Usuario[]; // Arreglo para almacenar datos de usuario
  Id: number; // Variable para almacenar el ID del usuario actual
  
  datosRequerimiento: CrearRequerimiento; // Objeto para datos de requerimiento
  
  sistema: Sistema = {
    Id: 0,
    Nombre: '',
    Activo: true,
  }; // Objeto para almacenar datos de un sistema
  
  ngOnInit(): void {
    // Método que se ejecuta cuando se inicializa el componente
    this.ObtenerSistemas(); // Llama a la función para obtener sistemas activos
    this.obtenerElaborador(); // Llama a la función para obtener usuarios elaboradores activos
    this.datosUsuario(); // Llama a la función para obtener datos del usuario actual
    this.mensajeAlmacenado(); // Llama a la función para verificar mensajes almacenados
  }
  
  ObtenerSistemas() {
    // Función para obtener sistemas activos a través del servicio CRUD
    this.crudService.getSistemaActivos().subscribe((res: Sistema[]) => {
      // Filtra los sistemas activos y almacena en el arreglo
      const sistemasActivos = res.filter((Sistema) => Sistema.Activo === true);
      this.sistemas = sistemasActivos;
    });
  }
  
  obtenerElaborador() {
    // Función para obtener usuarios elaboradores activos a través del servicio CRUD
    this.crudService.getUsuarios().subscribe((res: Usuario[]) => {
      // Filtra los usuarios activos con RolId igual a 2 (posiblemente elaboradores) y almacena en el arreglo
      const usuariosActivos = res.filter(
        (Usuario) => Usuario.Activo === true && Usuario.RolId === 2
      );
      this.usuarios = usuariosActivos;
    });
  }
  
  camposLlenos(): boolean {
    // Función para verificar si todos los campos obligatorios del requerimiento están llenos
    return (
      this.requerimiento.Descripcion.trim() !== '' &&
      this.requerimiento.Objetivo.trim() !== '' &&
      this.requerimiento.SistemaId !== 0 &&
      this.requerimiento.UsuarioIdElaborador !== 0
    );
  }
  
  datosUsuario() {
    // Función para obtener datos del usuario actual a través del servicio DatosUsuario
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response: Usuario[]) => {
        this.DatosUsuario = response;
        this.Id = this.DatosUsuario[0].Id; // Obtiene el ID del usuario
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }
  
  crearRequerimiento() {
    this.requerimiento.UsuarioIdCreador = this.Id; // Asigna el ID del usuario creador al requerimiento
  
    this.crudService.crearRequerimiento(this.requerimiento).subscribe(
      (res) => {
        // Maneja la respuesta del backend y muestra un mensaje de éxito
        this.router.navigate(['/home/admin']); // Redirige a la página de inicio del administrador
        alertifyjs.success(res.message); // Muestra el mensaje de éxito
      },
      (error) => {
        // Maneja errores en caso de falla en la creación del requerimiento
        //console.error('Error en el registro', error.mensaje);
        //alertifyjs.error(error)
      }
    );
  }
  
  validarTipoCambio(): boolean {
    if (this.sistema !== undefined) {
      return this.sistema.Nombre.trim() !== ''; // Verifica si el nombre del sistema no está vacío
    }
    return false;
  }
  
  mensajeAlmacenado() {
    // Función para verificar si hay un mensaje almacenado en el almacenamiento local
    const mensaje = localStorage.getItem('mensaje');
    if (mensaje) {
      // Muestra el mensaje con alertify o cualquier otro mecanismo de notificación
      alertifyjs.success(mensaje);
  
      // Limpia el mensaje del almacenamiento local
      localStorage.removeItem('mensaje');
    }
  }
  
  guardarSistema() {
    this.crudService.crearSistema(this.sistema).subscribe(
      (res) => {
        // Almacena el mensaje en el almacenamiento local antes de recargar la página
        localStorage.setItem('mensaje', res.message);
        window.location.reload(); // Recarga la página
      },
      (error) => {
        // Maneja errores en caso de falla en la creación del sistema
      }
    );
  }
}  