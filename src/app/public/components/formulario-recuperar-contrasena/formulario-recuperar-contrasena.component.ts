import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-formulario-recuperar-contrasena',
  templateUrl: './formulario-recuperar-contrasena.component.html',
  styleUrls: ['./formulario-recuperar-contrasena.component.css'],
})
export class FormularioRecuperarContrasenaComponent {
  constructor(private authService: AuthService, private router: Router) {}

  usuario = {
    Correo: '',
  };

  enviarCorreo() {
    // Cuando se presiona el botón para enviar el correo de recuperación
    this.authService.enviarContrasena(this.usuario).subscribe(
      (res) => {
        // Si la solicitud es exitosa, navegar de regreso a la página de inicio de sesión
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
}
