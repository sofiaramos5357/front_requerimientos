import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import * as alertifyjs from 'alertifyjs';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent implements OnInit {

constructor(
  private authService: AuthService,
  private router: Router,
  private datosUsuarioService: DatosUsuarioService

  ){}

  ngOnInit(): void {
  }
  
  usuario={
    Correo:'',
    Contrasena:''
  }

  DatosUsuario: Usuario[];

  
signUp(){
  this.authService.signUp(this.usuario)
  .subscribe(
    res=> {
      localStorage.setItem('token', res.token);

      this.datosUsuarioService.DatosUsuario().subscribe(
        (response: Usuario[]) => {
          this.DatosUsuario = response;
          if(this.DatosUsuario[0].RolId==1)
          this.router.navigate(['/homeadmin']);
          if(this.DatosUsuario[0].RolId==2)
          this.router.navigate(['/homeelaborador']);
        },
        (error) => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    //this.router.navigate(['/home']);
    //alertifyjs.success(res.token)
    //console.log(res)
    }
  )
}





}
