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

  sistemas: Sistema[];
  usuarios: Usuario[];

  requerimiento = {
    SistemaId: 0,
    UsuarioIdElaborador: 0,
    Descripcion: '',
    Objetivo: '',
    UsuarioIdCreador: 0,
    FechaCreacion: new Date(),
  };

  DatosUsuario: Usuario[];
  Id: number;

  datosRequerimiento: CrearRequerimiento;

  sistema:Sistema={
    Id: 0,
    Nombre: '',
    Activo: true
  }

  ngOnInit(): void {
    this.ObtenerSistemas();
    this.obtenerElaborador();
    this.datosUsuario();
    this.mensajeAlmacenado();

  }

  ObtenerSistemas() {
    //obtiene los roles y solo almacena los activos
    this.crudService.getSistemaActivos().subscribe((res: Sistema[]) => {
      const sistemasActivos = res.filter((Sistema) => Sistema.Activo === true);
      this.sistemas = sistemasActivos;
      //console.log(this.sistemas)
    });
  }

  obtenerElaborador() {
    //obtiene los elaboradores y solo almecena los activos
    this.crudService.getUsuarios().subscribe((res: Usuario[]) => {
      const usuariosActivos = res.filter((Usuario) => Usuario.Activo === true && Usuario.RolId===2);
      this.usuarios = usuariosActivos;
      //console.log(this.usuarios)
    });
  }

  camposLlenos(): boolean {
    // Verifica si todos los campos obligatorios están llenos
    return (
      this.requerimiento.Descripcion.trim() !== '' &&
      this.requerimiento.Objetivo.trim() !== '' &&
      this.requerimiento.SistemaId !== 0 &&
      this.requerimiento.UsuarioIdElaborador !== 0
    );
  }

  datosUsuario() {
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response: Usuario[]) => {
        this.DatosUsuario = response;
        this.Id = this.DatosUsuario[0].Id;
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  crearRequerimiento() {
    this.requerimiento.UsuarioIdCreador=this.Id
    //console.log(this.requerimiento)

    this.crudService.crearRequerimiento(this.requerimiento).subscribe(
      res => {
        // Aquí puedes manejar la respuesta del backend si es necesario
        //console.log('Requerimiento creado', res);
        //console.log(this.requerimiento)
        this.router.navigate(['/home/admin']);
        alertifyjs.success(res.message)
      },
      (error) => {
        // Manejar errores aquí
        //console.error('Error en el registro', error.mensaje);
        //alertifyjs.error(error)
      }
    );

  }


  validarTipoCambio(): boolean {
    if (this.sistema !== undefined) {
      return this.sistema.Nombre.trim() !== '';
    }
    return false;
  }

  mensajeAlmacenado() {
    // Verificar si hay un mensaje almacenado en el almacenamiento local
    const mensaje = localStorage.getItem('mensaje');
    if (mensaje) {
      // Mostrar el mensaje con alertify o cualquier otro mecanismo de notificación
      alertifyjs.success(mensaje);

      // Limpiar el mensaje del almacenamiento local
      localStorage.removeItem('mensaje');
    }
  }

  guardarSistema() {
    this.crudService.crearSistema(this.sistema).subscribe(
      (res) => {
        // Almacenar el mensaje en el almacenamiento local antes de recargar
        localStorage.setItem('mensaje', res.message);
        window.location.reload();
      },
      (error) => {}
    );
  }

}
