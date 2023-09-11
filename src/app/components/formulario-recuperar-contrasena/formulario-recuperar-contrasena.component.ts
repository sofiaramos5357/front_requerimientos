import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-recuperar-contrasena',
  templateUrl: './formulario-recuperar-contrasena.component.html',
  styleUrls: ['./formulario-recuperar-contrasena.component.css']
})
export class FormularioRecuperarContrasenaComponent {

  constructor(private authService:AuthService, private router: Router,){
  }

  usuario = {
    Correo: '',

  };

  enviarCorreo(){
    this.authService.enviarContrasena(this.usuario.Correo).subscribe(
      (response) => {
        console.log(response);
        //this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);

      }
    );
  }
}
