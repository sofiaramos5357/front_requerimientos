import { Component } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-formulario-crear-usuario',
  templateUrl: './formulario-crear-usuario.component.html',
  styleUrls: ['./formulario-crear-usuario.component.css'],
})
export class FormularioCrearUsuarioComponent {
  nuevoUsuario = {
    Identidad: '',
    Nombre: '',
    Apellido: '',
    Correo: '',
    Contrasena: '',
    NombreUsuario: '',
  };

  contrasenaConfirmacion = ''; // Para almacenar la confirmación de contraseña
  contrasenasCoinciden = true; // Para verificar si las contraseñas coinciden

  constructor(private crudService: CrudService, private router: Router) {}

  registrar() {
    const camposNoVacios = Object.values(this.nuevoUsuario).every(
      (campo) => !!campo
    );

    if (this.nuevoUsuario.Contrasena.length < 8) {
      // La contraseña es demasiado corta, mostrar un mensaje de error
      alertifyjs.error('La contraseña debe tener 8 o más caracteres');
    } else if (
      this.nuevoUsuario.Contrasena === this.contrasenaConfirmacion &&
      camposNoVacios
    ) {
      // Las contraseñas coinciden y son lo suficientemente largas, continuar con el registro
      this.nuevoUsuario.Contrasena = this.contrasenaConfirmacion;
      this.crudService.crearUsuario(this.nuevoUsuario).subscribe(
        (res) => {
          this.nuevoUsuario = {
            Identidad: '',
            Nombre: '',
            Apellido: '',
            Correo: '',
            Contrasena: '',
            NombreUsuario: '',
          };
          this.contrasenaConfirmacion = '';
          this.router.navigate(['/login']);
          alertifyjs.success(res.message);
        },
        (error) => {
          // Manejar errores aquí
          console.error('Error en el registro', error.mensaje);
          alertifyjs.error(error.message);
        }
      );
    }

    if (!camposNoVacios) {
      alertifyjs.error('Ingrese todos los campos');
    }

    if (this.nuevoUsuario.Contrasena !== this.contrasenaConfirmacion) {
      this.contrasenasCoinciden = false;
    }
  }

  verificarContrasenas() {
    this.contrasenasCoinciden =
      this.nuevoUsuario.Contrasena === this.contrasenaConfirmacion;
  }
}
