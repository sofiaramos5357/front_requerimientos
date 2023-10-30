import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { Sistema } from 'src/app/models/sistema.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CrudService } from 'src/app/services/crud.service';
import * as alertifyjs from 'alertifyjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-editar-req',
  templateUrl: './formulario-editar-req.component.html',
  styleUrls: ['./formulario-editar-req.component.css'],
})
export class FormularioEditarReqComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private router: Router
  ) {}

  palabraModal: string = 'Requerimiento'; // Variable para almacenar la palabra a mostrar en el modal

  datosRuta: RequerimientoCreado; // Almacena los datos del requerimiento obtenidos de la ruta
  sistemas: Sistema[]; // Arreglo para almacenar sistemas
  usuarios: Usuario[]; // Arreglo para almacenar usuarios
  requerimiento: {
    Id: number;
    Descripcion: String;
    Objetivo: String;
    SistemaId: number;
    UsuarioIdElaborador: number;
  }; // Objeto para almacenar los datos del requerimiento
  
  RequerimientoCambio: {
    Id: number;
  }; // Objeto para almacenar el ID del requerimiento a modificar o eliminar
  
  handleEliminar(eventData: { eliminar: boolean }) {
    this.eliminarRequerimiento(); // Maneja la eliminación de un requerimiento
  }
  
  ngOnInit() {
    this.obtenerDatosRuta(); // Llama a la función para obtener datos de la ruta
    this.ObtenerSistemas(); // Llama a la función para obtener sistemas
    this.obtenerElaborador(); // Llama a la función para obtener usuarios elaboradores
  }
  
  obtenerDatosRuta() {
    // Función para recuperar datos pasados a través de los parámetros de la ruta
    this.route.queryParams.subscribe((params) => {
      const requerimientoParam = params['requerimiento'];
      if (requerimientoParam) {
        try {
          const requerimiento = JSON.parse(requerimientoParam);
          this.datosRuta = requerimiento; // Almacena los datos del requerimiento en este componente
        } catch (error) {
          console.error('Error al analizar JSON:', error);
          // Maneja el error de análisis JSON de acuerdo a las necesidades
        }
      } else {
        console.error("El parámetro 'requerimiento' es undefined o null");
        // Maneja el caso en el que el parámetro 'requerimiento' no esté definido
      }
    });
  }
  
  ObtenerSistemas() {
    // Función para obtener sistemas activos a través del servicio CRUD
    this.crudService.getSistemas().subscribe((res: Sistema[]) => {
      // Filtra los sistemas activos y almacena en el arreglo
      const sistemasActivos = res.filter((Sistema) => Sistema.Activo === true);
      this.sistemas = sistemasActivos;
    });
  }
  
  obtenerElaborador() {
    // Función para obtener usuarios elaboradores activos a través del servicio CRUD
    this.crudService.getUsuarios().subscribe((res: Usuario[]) => {
      // Filtra los usuarios activos con RolId igual a 2 (posiblemente elaboradores) y almacena en el arreglo
      const usuariosActivos = res.filter(
        (Usuario) => Usuario.Activo === true && Usuario.RolId === 2
      );
      this.usuarios = usuariosActivos;
    });
  }
  
  guardarCambios() {
    this.requerimiento = {
      Id: this.datosRuta.Id,
      Descripcion: this.datosRuta.Descripcion,
      Objetivo: this.datosRuta.Objetivo,
      SistemaId: this.datosRuta.SistemaId,
      UsuarioIdElaborador: this.datosRuta.UsuarioIdElaborador,
    };
    // Realiza cambios en los datos del requerimiento con los valores actuales
  
    this.crudService.modificarRequerimiento(this.requerimiento).subscribe(
      (res) => {
        // Maneja la respuesta del backend y muestra un mensaje de éxito
        this.router.navigate(['/home/admin']); // Redirige a la página de inicio del administrador
        alertifyjs.success(res.message); // Muestra el mensaje de éxito
      },
      (error) => {
        // Maneja errores en caso de falla en la modificación del requerimiento
      }
    );
  }
  
  eliminarRequerimiento() {
    this.RequerimientoCambio = {
      Id: this.datosRuta.Id,
    };
    // Asigna el ID del requerimiento a eliminar
  
    this.crudService.eliminarRequerimiento(this.RequerimientoCambio).subscribe(
      (res) => {
        // Maneja la respuesta del backend y muestra un mensaje de éxito
        this.router.navigate(['/home/admin']); // Redirige a la página de inicio del administrador
        alertifyjs.success(res.message); // Muestra el mensaje de éxito
      },
      (error) => {
        // Maneja errores en caso de falla en la eliminación del requerimiento
      }
    );
  }
}  