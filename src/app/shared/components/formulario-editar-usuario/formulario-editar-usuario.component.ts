import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';
import { Usuario } from 'src/app/models/usuario.model';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';

@Component({
  selector: 'app-formulario-editar-usuario',
  templateUrl: './formulario-editar-usuario.component.html',
  styleUrls: ['./formulario-editar-usuario.component.css'],
})
export class FormularioEditarUsuarioComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private router: Router,
    private datosUsuarioService: DatosUsuarioService
  ) {}

  ngOnInit(): void {
    this.datosUsuario();
  }

  DatosUsuario: Usuario[];

  nuevoUsuario = {
    Id: 0,
    Nombre: '',
    Apellido: '',
    Contrasena: '',
    NombreUsuario: '',
  };

  modificarUsuario() {
    this.crudService.modificarUsuarioPropio(this.nuevoUsuario).subscribe(
      (res) => {
        // Al modificar el usuario, redirigir de nuevo a la página de inicio de sesión
        this.router.navigate(['/login']);
        // Mostrar un mensaje de éxito al usuario
        alertifyjs.success(res.message);
      },
      (error) => {
        // Puedes manejar errores aquí si es necesario
        // Por el momento, no se está realizando ninguna acción específica para errores
      }
    );
  }

  datosUsuario() {
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response: Usuario[]) => {
        this.DatosUsuario = response;
        // Asignar los datos del usuario actual a nuevoUsuario para su edición
        this.nuevoUsuario = {
          Id: this.DatosUsuario[0].Id,
          Nombre: this.DatosUsuario[0].Nombre,
          Apellido: this.DatosUsuario[0].Apellido,
          Contrasena: '',
          NombreUsuario: '',
        };
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }
}
