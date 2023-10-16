import { Component } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-formulario-cambiar-contrasena',
  templateUrl: './formulario-cambiar-contrasena.component.html',
  styleUrls: ['./formulario-cambiar-contrasena.component.css']
})
export class FormularioCambiarContrasenaComponent {
  nuevaContrasena = {
    Contrasena: ''
  };

  contrasenaConfirmacion = ''; // Para almacenar la confirmación de contraseña
  contrasenasCoinciden = true; // Para verificar si las contraseñas coinciden
  
  constructor(private crudService:CrudService, private router: Router,){
  }

  registrar() {

    const camposNoVacios = Object.values(this.nuevaContrasena).every((campo) => !!campo);

    if (this.nuevaContrasena.Contrasena === this.contrasenaConfirmacion && camposNoVacios) {
      // Las contraseñas coinciden, guardar la contraseña en nuevoUsuario.Contrasena
      this.nuevaContrasena.Contrasena = this.contrasenaConfirmacion;
      // Luego, puedes realizar la lógica de registro aquí
      this.crudService.nuevaContrasena(this.nuevaContrasena).subscribe(
        res => {
          // Limpia los campos del formulario u realiza otras acciones necesarias después del registro
          this.nuevaContrasena = {
            Contrasena: ''
          };
          this.contrasenaConfirmacion = '';
          this.router.navigate(['/login']);
          alertifyjs.success(res.message)
        },
        (error) => {
          // Manejar errores aquí
          //console.error('Error en el registro', error.mensaje);
          //alertifyjs.error(error)
        }
      );
    } if(!camposNoVacios){
      alertifyjs.error('Ingrese todos los campos')
    }
    if(this.nuevaContrasena.Contrasena !== this.contrasenaConfirmacion) {
      // Las contraseñas no coinciden, muestra un mensaje de error o toma la acción adecuada
      this.contrasenasCoinciden = false;
    }
  }

  verificarContrasenas() {
    // Verificar si las contraseñas coinciden cada vez que se modifica contrasenaConfirmacion
    this.contrasenasCoinciden = this.nuevaContrasena.Contrasena === this.contrasenaConfirmacion;
  }
}
