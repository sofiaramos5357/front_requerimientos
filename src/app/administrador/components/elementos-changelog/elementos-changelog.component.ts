import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { CrudService } from 'src/app/services/crud.service';
import { Changelog } from 'src/app/models/changelog.model';
import { RequerimientoDetalle } from 'src/app/models/requerimiento-detalle.model';

@Component({
  selector: 'app-elementos-changelog',
  templateUrl: './elementos-changelog.component.html',
  styleUrls: ['./elementos-changelog.component.css']
})
export class ElementosChangelogComponent implements OnInit {

  constructor(private route: ActivatedRoute,private datosUsuarioService: DatosUsuarioService,private router: Router, private crudService: CrudService) {
   }


  ngOnInit() {
    this.obtenerDatosRuta()
  }

  SistemaId: number
  changelog:Changelog
  requerimientoDetalles: RequerimientoDetalle[] = [];

  obtenerDatosRuta() {
    // Recupera los datos pasados a través de los parámetros de la ruta
    this.route.queryParams.subscribe(params => {
      const SistemaParam = params['sistemaId'];
      //console.log(requerimientoParam);
      if (SistemaParam) {
        try {
          const sistemaId = JSON.parse(SistemaParam);
          // utilizar los datos de requerimiento en este componente
          this.SistemaId = sistemaId          
          this.obtenerChangelog(this.SistemaId)

        } catch (error) {
          //console.error("Error al analizar JSON:", error);
          // Maneja el error de análisis JSON 
        }
      } else {
        //console.error("El parámetro 'sistemaId' es undefined o null");
        // Maneja el caso en el que el parámetro 'requerimiento' no esté definido
      }
    });
  }

  obtenerChangelog(id){
    this.crudService.getChangelog(id).subscribe((res: Changelog) => {
      this.changelog = res[0]
      console.log(this.changelog)
      this.obtenerActividadesRealizadas(this.changelog.RequerimientoCambioId)
    });
    
  }

  obtenerActividadesRealizadas(id) {
    this.crudService.getRequerimientoDetalle(id).subscribe((res: RequerimientoDetalle[]) => {
      this.requerimientoDetalles = res
      //console.log(this.requerimientoDetalles)
    });
  }


}
