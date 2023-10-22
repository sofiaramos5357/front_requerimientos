import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./formulario-visualizar-req.component.css']
})
export class FormularioVisualizarReqComponent implements OnInit {

  constructor(private route: ActivatedRoute,private datosUsuarioService: DatosUsuarioService,private router: Router, private crudService: CrudService) { }

  datosRuta: RequerimientoCreado
  datosUsuario: Usuario 


  datosFichaTecnica:DatosFichaTecnica
  FechaCreacion:string

  ngOnInit() {
    this.obtenerDatosRuta()
    this.DatosUsuario()
  }

  obtenerDatosRuta() {
    // Recupera los datos pasados a través de los parámetros de la ruta
    this.route.queryParams.subscribe(params => {
      const requerimientoParam = params['requerimiento'];
      //console.log(requerimientoParam);
      if (requerimientoParam) {
        try {
          const requerimiento = JSON.parse(requerimientoParam);
          // utilizar los datos de requerimiento en este componente
          this.datosRuta = requerimiento
          this.FechaCreacion=this.formatDate(new Date(this.datosRuta.FechaCreacion))
          this.obtenerFichaTecnica(this.datosRuta.Id)

        } catch (error) {
          console.error("Error al analizar JSON:", error);
          // Maneja el error de análisis JSON 
        }
      } else {
        console.error("El parámetro 'requerimiento' es undefined o null");
        // Maneja el caso en el que el parámetro 'requerimiento' no esté definido
      }
    });
  }

  DatosUsuario() {
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
        this.datosUsuario = response[0];
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  eliminarRequerimiento() {

    this.crudService.eliminarRequerimiento(this.datosRuta).subscribe(
      (res) => {
        alertifyjs.success(res.message)
        this.router.navigate(['/home/admin']);
        //console.log('Requerimiento modificado correctamente', res);
      },
      (error) => {
        //     // Manejar errores aquí, si es necesario
        //     //console.error('Error al modificar usuario', error);
      }
    );
  }

  obtenerFichaTecnica(id){
    this.crudService.getFichaTecnica(id).subscribe((res: DatosFichaTecnica) => {
      this.datosFichaTecnica = res[0]
      //console.log(this.datosFichaTecnica)
    });
    
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('es-ES', options);
  }

}
