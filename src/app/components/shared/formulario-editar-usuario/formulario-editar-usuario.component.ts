import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';
import { Usuario } from 'src/app/models/usuario.model';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';

@Component({
  selector: 'app-formulario-editar-usuario',
  templateUrl: './formulario-editar-usuario.component.html',
  styleUrls: ['./formulario-editar-usuario.component.css'],
})
export class FormularioEditarUsuarioComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private router: Router,
    private datosUsuarioService: DatosUsuarioService
  ) {}

  ngOnInit(): void {
    this.datosUsuario();
  }

  DatosUsuario: Usuario[];

  nuevoUsuario = {
    Id: 0,
    Identidad: '',
    Nombre: '',
    Apellido: '',
    Contrasena: '',
    NombreUsuario: '',
  };

  modificarUsuario() {
    //console.log(this.nuevoUsuario)
    this.crudService.modificarUsuarioPropio(this.nuevoUsuario).subscribe(
      (res) => {
        this.router.navigate(['/login']);
        alertifyjs.success(res.message);
      },
      (error) => {
        // Manejar errores aquí
        //console.error('Error en el registro', error.mensaje);
        //alertifyjs.error(error)
      }
    );
    
  }

  datosUsuario() {
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response: Usuario[]) => {
        this.DatosUsuario = response;
        //console.log(this.DatosUsuario[0].Id)
        this.nuevoUsuario = {
          Id: this.DatosUsuario[0].Id,
          Identidad: this.DatosUsuario[0].Identidad,
          Nombre: this.DatosUsuario[0].Nombre,
          Apellido: this.DatosUsuario[0].Apellido,
          Contrasena: '',
          NombreUsuario: this.DatosUsuario[0].NombreUsuario,
        };
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }
}
