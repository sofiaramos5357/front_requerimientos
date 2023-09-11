import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent implements OnInit {

constructor(
  private authService: AuthService,
  private router: Router,
  ){}

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
      console.log(res.token);
      localStorage.setItem('token', res.token);
    this.router.navigate(['/home']);
    },
    err=>console.log(err)
  )
  console.log(this.usuario)
}
  
}
