import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';

import { TipoObjeto } from 'src/app/models/tipo-objeto.model';
import { CrudService } from 'src/app/services/crud.service';
import { RequerimientoDetalle } from 'src/app/models/requerimiento-detalle.model';


@Component({
  selector: 'app-elementos-re-detalle',
  templateUrl: './elementos-re-detalle.component.html',
  styleUrls: ['./elementos-re-detalle.component.css']
})
export class ElementosReDetalleComponent implements OnInit{

  constructor(private route: ActivatedRoute,private router: Router,private crudService: CrudService,) { }

  datosRuta: RequerimientoCreado
  tipoObjetos: TipoObjeto[];
  detalles: RequerimientoDetalle[] = [];
  numDetalle: number= 0

  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1;  // Página actual


  requerimientoDetalle: RequerimientoDetalle = {
    TipoObjetoId: 0,
    Objeto: '',
    Ubicacion: '',
    Actividad: '',
    Observaciones: '',
    FechaRegistro: new Date(),
    RequerimientoCambioId: 0,
    NombreObjeto:''
  };


  ngOnInit() {
    this.obtenerDatosRuta()
    this.ObtenerTipoObjeto()
    this.detallesCreados()
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

  ObtenerTipoObjeto() {
    //obtiene los roles y solo almacena los activos
    this.crudService.getTipoObjetos().subscribe((res: TipoObjeto[]) => {
      this.tipoObjetos = res;
      //console.log(this.tipoObjetos.Id)
    });
  }

  crearDetalle(){
    this.requerimientoDetalle.RequerimientoCambioId=this.datosRuta.Id

    this.crudService.crearRequerimientoDetalle(this.requerimientoDetalle).subscribe(
      res => {
        // Aquí puedes manejar la respuesta del backend si es necesario
        console.log('Detalle de requerimiento creado', res);
        //console.log(this.requerimiento)
        window.location.reload();
        alertifyjs.success(res.message)
      },
      (error) => {
        // Manejar errores aquí
        //console.error('Error en el registro', error.mensaje);
        //alertifyjs.error(error)
      }
    );
    
   //console.log(this.requerimientoDetalle);
   
  }

  detallesCreados() {
    this.crudService.getRequerimientoDetalle(this.datosRuta.Id).subscribe((res: RequerimientoDetalle[]) => {
      // Filtrar los elementos que no tienen estadoId igual a 5 o 6
      this.detalles = res
      //console.log(this.detalles);
      
    });
}


getUsersForPage(): RequerimientoDetalle[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.detalles.slice(startIndex, endIndex);
}
getTotalPages(): number {
  return Math.ceil(this.detalles.length / this.itemsPerPage);
}

getPages(): number[] {
  return Array(this.getTotalPages()).fill(0).map((_, index) => index + 1);
}


}
