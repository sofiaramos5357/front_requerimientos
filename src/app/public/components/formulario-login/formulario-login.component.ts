import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css'],
})
export class FormularioLoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private datosUsuarioService: DatosUsuarioService
  ) {}

  ngOnInit(): void {}

  usuario = {
    Correo: '',
    Contrasena: '',
  };

  DatosUsuario: Usuario[]; // Un array para almacenar los datos del usuario

  signUp() {
    this.authService.signUp(this.usuario).subscribe((res) => {
      // Al registrarse, se guarda el token en el almacenamiento local
      localStorage.setItem('token', res.token);

      this.datosUsuarioService.DatosUsuario().subscribe(
        (response: Usuario[]) => {
          this.DatosUsuario = response;
          if (
            this.DatosUsuario[0].RolId == 1 &&
            this.DatosUsuario[0].CambioContrasena == false
          )
            this.router.navigate(['/home/admin']); // Redirige a la página de inicio de administrador
          if (
            this.DatosUsuario[0].RolId == 2 &&
            this.DatosUsuario[0].CambioContrasena == false
          )
            this.router.navigate(['/home/elaborador']); // Redirige a la página de inicio de elaborador
          if (this.DatosUsuario[0].CambioContrasena == true)
            this.router.navigate(['/cambiarcontrasena']); // Redirige a la página de cambio de contraseña si es necesario
        },
        (error) => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    });
  }
}
