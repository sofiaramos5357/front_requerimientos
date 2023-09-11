import { Component } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-formulario-crear-usuario',
  templateUrl: './formulario-crear-usuario.component.html',
  styleUrls: ['./formulario-crear-usuario.component.css']
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
  
  constructor(private crudService:CrudService, private router: Router,){
  }

  registrar() {
    if (this.nuevoUsuario.Contrasena === this.contrasenaConfirmacion) {
      // Las contraseñas coinciden, guardar la contraseña en nuevoUsuario.Contrasena
      this.nuevoUsuario.Contrasena = this.contrasenaConfirmacion;
      // Luego, puedes realizar la lógica de registro aquí
      this.crudService.crearUsuario(this.nuevoUsuario).subscribe(
        (response) => {
          // Aquí puedes manejar la respuesta del backend si es necesario
          console.log('Registro exitoso', response);
          // Limpia los campos del formulario u realiza otras acciones necesarias después del registro
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

          // Limpia el mensaje de error si había uno previamente
        },
        (error) => {
          // Manejar errores aquí
          console.error('Error en el registro', error);
        }
      );
    } else {
      // Las contraseñas no coinciden, muestra un mensaje de error o toma la acción adecuada
      this.contrasenasCoinciden = false;      
    }
  }

  verificarContrasenas() {
    // Verificar si las contraseñas coinciden cada vez que se modifica contrasenaConfirmacion
    this.contrasenasCoinciden = this.nuevoUsuario.Contrasena === this.contrasenaConfirmacion;
  }
}

