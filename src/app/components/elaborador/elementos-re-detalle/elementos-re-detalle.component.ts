import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { Router } from '@angular/router';

import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';

@Component({
  selector: 'app-elementos-re-detalle',
  templateUrl: './elementos-re-detalle.component.html',
  styleUrls: ['./elementos-re-detalle.component.css']
})
export class ElementosReDetalleComponent implements OnInit{

  constructor(private route: ActivatedRoute,private router: Router) { }

  datosRuta: RequerimientoCreado


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
          // utilizar los datos de requerimiento en este componente
          this.datosRuta = requerimiento
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
}
