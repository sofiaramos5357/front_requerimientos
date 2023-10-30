import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { Usuario } from 'src/app/models/usuario.model';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public authService:AuthService, private datosUsuarioService:DatosUsuarioService, private router: Router){}

  datosUsuario: Usuario;

  ngOnInit(): void {
    this.DatosUsuario()
  }

  DatosUsuario(){
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
          this.datosUsuario = response[0];
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  reloadPageIfCurrentRoute(route: string) {
    if (this.router.url === route) {
      window.location.reload();
    }
  }
  
}
