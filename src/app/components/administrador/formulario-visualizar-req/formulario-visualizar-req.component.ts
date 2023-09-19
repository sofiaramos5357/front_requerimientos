import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { Usuario } from 'src/app/models/usuario.model';

import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';

@Component({
  selector: 'app-formulario-visualizar-req',
  templateUrl: './formulario-visualizar-req.component.html',
  styleUrls: ['./formulario-visualizar-req.component.css']
})
export class FormularioVisualizarReqComponent implements OnInit {

  constructor(private route: ActivatedRoute,private datosUsuarioService: DatosUsuarioService) { }

  datosRuta: RequerimientoCreado
  datosUsuario: Usuario


  ngOnInit() {
    this.obtenerDatosRuta()
  }

  obtenerDatosRuta() {
    // Recupera los datos pasados a través de los parámetros de la ruta
    this.route.queryParams.subscribe(params => {
      const requerimientoParam = params['requerimiento'];
      //console.log(requerimientoParam);
      if (requerimientoParam) {
        try {
          const requerimiento = JSON.parse(requerimientoParam);
          // Ahora puedes utilizar los datos de requerimiento en este componente
          this.datosRuta = requerimiento
        } catch (error) {
          console.error("Error al analizar JSON:", error);
          // Maneja el error de análisis JSON de acuerdo a tus necesidades
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

}
