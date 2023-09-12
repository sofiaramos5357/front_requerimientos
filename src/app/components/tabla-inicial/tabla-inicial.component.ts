import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service'; // Importa el servicio AuthService

@Component({
  selector: 'app-tabla-inicial',
  templateUrl: './tabla-inicial.component.html',
  styleUrls: ['./tabla-inicial.component.css']
})
export class TablaInicialComponent implements OnInit {

  constructor(private authService: AuthService) { }
  userData: Usuario; // Almacena los datos del usuario


  ngOnInit(): void {

    // Obtener los datos del usuario al iniciar el componente
    this.authService.getUserData().subscribe((userData: Usuario) => {
      this.userData = userData;
    });
  }
}
