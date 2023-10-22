import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { Router } from '@angular/router';

import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { DatosFichaTecnica } from 'src/app/models/datos-ficha-tecnica.model';
import { CrudService } from 'src/app/services/crud.service';


@Component({
  selector: 'app-formulario-req-asignado',
  templateUrl: './formulario-req-asignado.component.html',
  styleUrls: ['./formulario-req-asignado.component.css']
})
export class FormularioReqAsignadoComponent implements OnInit{

  constructor(private route: ActivatedRoute,private router: Router, private crudService: CrudService) { }

  datosRuta: RequerimientoCreado
  datosFichaTecnica:DatosFichaTecnica

  FechaCreacion:string




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
          this.obtenerFichaTecnica(this.datosRuta.Id)
          this.FechaCreacion=this.formatDate(new Date(this.datosRuta.FechaCreacion))


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



  envioIdReq(requerimiento) {
      this.router.navigate(['/fichatecnica'], {
        queryParams: { requerimiento: JSON.stringify(requerimiento) }
      });
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
