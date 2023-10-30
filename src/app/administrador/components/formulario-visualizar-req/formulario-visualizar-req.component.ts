import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';

import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { CrudService } from 'src/app/services/crud.service';
import { DatosFichaTecnica } from 'src/app/models/datos-ficha-tecnica.model';

@Component({
  selector: 'app-formulario-visualizar-req',
  templateUrl: './formulario-visualizar-req.component.html',
  styleUrls: ['./formulario-visualizar-req.component.css'],
})
export class FormularioVisualizarReqComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private datosUsuarioService: DatosUsuarioService,
    private router: Router,
    private crudService: CrudService
  ) {}

  palabraModal: string = 'Requerimiento'; // Variable para almacenar la palabra a mostrar en el modal

  handleEliminar(eventData: { eliminar: boolean }) {
    // Función para manejar la eliminación de un requerimiento
    this.eliminarRequerimiento();
  }
  
  eliminarRequerimiento() {
    // Función para eliminar un requerimiento utilizando el servicio 'crudService'
    this.crudService.eliminarRequerimiento(this.datosRuta).subscribe(
      (res) => {
        // Muestra un mensaje de éxito y navega a la página de inicio del administrador después de eliminar
        alertifyjs.success(res.message);
        this.router.navigate(['/home/admin']);
      },
      (error) => {
        // Manejar errores aquí, si es necesario
        //console.error('Error al modificar usuario', error);
      }
    );
  }
  
  datosRuta: RequerimientoCreado;
  datosUsuario: Usuario;
  datosFichaTecnica: DatosFichaTecnica;
  FechaCreacion: string;
  
  ngOnInit() {
    // Se ejecuta al inicializar el componente
    this.obtenerDatosRuta(); // Llama a la función para obtener datos de la ruta
    this.DatosUsuario(); // Llama a la función para obtener datos del usuario
  }
  
  obtenerDatosRuta() {
    // Recupera los datos pasados a través de los parámetros de la ruta
    this.route.queryParams.subscribe((params) => {
      const requerimientoParam = params['requerimiento'];
      if (requerimientoParam) {
        try {
          // Convierte los datos de requerimiento de JSON a un objeto
          const requerimiento = JSON.parse(requerimientoParam);
          this.datosRuta = requerimiento;
          // Formatea la fecha de creación en un formato específico
          this.FechaCreacion = this.formatDate(new Date(this.datosRuta.FechaCreacion));
          // Obtiene detalles adicionales (ficha técnica) para el requerimiento
          this.obtenerFichaTecnica(this.datosRuta.Id);
        } catch (error) {
          console.error('Error al analizar JSON:', error);
          // Maneja el error de análisis JSON
        }
      } else {
        console.error("El parámetro 'requerimiento' es undefined o null");
        // Maneja el caso en el que el parámetro 'requerimiento' no esté definido
      }
    });
  }
  
  DatosUsuario() {
    // Obtiene los datos del usuario a través del servicio 'datosUsuarioService'
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
        this.datosUsuario = response[0];
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }
  
  obtenerFichaTecnica(id) {
    // Obtiene detalles de la ficha técnica asociados al ID proporcionado
    this.crudService.getFichaTecnica(id).subscribe((res: DatosFichaTecnica) => {
      this.datosFichaTecnica = res[0];
      //console.log(this.datosFichaTecnica)
    });
  }
  
  formatDate(date: Date): string {
    // Función para formatear una fecha en un formato específico
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return date.toLocaleDateString('es-ES', options);
  }
}  