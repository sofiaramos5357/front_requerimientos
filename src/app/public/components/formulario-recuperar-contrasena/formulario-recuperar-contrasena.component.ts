import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';

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
    this.authService.enviarContrasena(this.usuario).subscribe(
      (res) => {
        this.router.navigate(['/login']);
        alertifyjs.success(res.message)

      },
      (error) => {
        //alertifyjs.error(error)
        //console.log(error);
      }
    );
  }
}
