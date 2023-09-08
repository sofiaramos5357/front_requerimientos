import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent implements OnInit {

constructor(private authService: AuthService){}

  ngOnInit(): void {
  }
  
  usuario={
    Correo:'',
    Contrasena:''
  }
  
signUp(){
  this.authService.signUp(this.usuario)
  .subscribe(
    res=> {
      console.log(res)
    },
    err=>console.log(err)
  )
  console.log(this.usuario)
}
  
}
