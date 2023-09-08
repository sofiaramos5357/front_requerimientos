import { Component } from '@angular/core';

@Component({
  selector: 'app-formulario-crear-usuario',
  templateUrl: './formulario-crear-usuario.component.html',
  styleUrls: ['./formulario-crear-usuario.component.css']
})
export class FormularioCrearUsuarioComponent {

  usuarioRegistrar={
    Identidad:'',
    Nombre:'',
    Apellido:'',
    Correo:'',
    Contrasena:'',
  }

  registrar(){
    console.log(this.usuarioRegistrar)
  }
}
