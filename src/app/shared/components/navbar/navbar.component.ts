import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { Usuario } from 'src/app/models/usuario.model';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';

import { Router } from '@angular/router';

import {CrudService} from 'src/app/services/crud.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public authService: AuthService, // Inyecta el servicio de autenticación
    private datosUsuarioService: DatosUsuarioService, // Inyecta el servicio de datos del usuario
    private router: Router,// Inyecta el servicio de enrutamiento
    private crudService: CrudService
    ) {}

  datosUsuario: Usuario; // Variable para almacenar los datos del usuario

  ngOnInit(): void {
    this.DatosUsuario(); // Llama a la función para obtener los datos del usuario cuando se inicializa el componente
  }

  DatosUsuario() {
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
        this.datosUsuario = response[0]; // Almacena los datos del usuario en la variable datosUsuario
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  // Recarga la página si la ruta actual coincide con la ruta proporcionada
  reloadPageIfCurrentRoute(route: string) {
    if (this.router.url === route) {
      window.location.reload();
    }
  }

  //logica para descargar los manuales de usuario
  descargarManuales(){
    var filePath = '/assets/manuales/Manualdeusuario.pdf';
    this.DescargarManuales(filePath);

     filePath = '/assets/manuales/Manualtecnico.pdf';
    this.DescargarManuales(filePath);
  }

  private DescargarManuales(filePath: string) {
    this.crudService.descargaManuales(filePath).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });

      // Crea un enlace temporal y simula un clic para iniciar la descarga
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filePath.split('/').pop(); // Nombre del archivo
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
}
