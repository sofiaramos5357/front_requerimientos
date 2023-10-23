import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequerimientoCreado } from 'src/app/models/requerimiento-creado';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';

import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { CrudService } from 'src/app/services/crud.service';
import { DatosFichaTecnica } from 'src/app/models/datos-ficha-tecnica.model';
import { RequerimientoDetalle } from 'src/app/models/requerimiento-detalle.model';
import { Revision } from 'src/app/models/revision';

@Component({
  selector: 'app-elementos-ingresar-revision',
  templateUrl: './elementos-ingresar-revision.component.html',
  styleUrls: ['./elementos-ingresar-revision.component.css']
})
export class ElementosIngresarRevisionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private datosUsuarioService: DatosUsuarioService,
    private router: Router,
    private crudService: CrudService,

  ) { }

  palabraModal: string='Requerimiento'; // Variable para almacenar la palabra a mostrar en el modal

  
  handleEliminar(eventData: {eliminar: boolean }) {
    this.eliminarRequerimiento()
  }

  datosRuta: RequerimientoCreado
  datosUsuario: Usuario


  datosFichaTecnica: DatosFichaTecnica
  requerimientoDetalles: RequerimientoDetalle[] = [];

  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1; // Página actual

  numDetalle: number = 0;

  revision = {
    Id: 0,
    FechaRevision: new Date(),
    UsuarioIdAprobador: 0,
    ObservacionesRevision: '',
    NombreAprobador: '',
    ApellidoAprobador: ''
  }


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
          this.obtenerFichaTecnica(this.datosRuta.Id)
          this.obtenerActividadesRealizadas(this.datosRuta.Id)

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

  obtenerFichaTecnica(id) {
    this.crudService.getFichaTecnica(id).subscribe((res: DatosFichaTecnica) => {
      this.datosFichaTecnica = res[0]
      //console.log(this.datosFichaTecnica)
    });

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

  obtenerActividadesRealizadas(id) {
    this.crudService.getRequerimientoDetalle(id).subscribe((res: RequerimientoDetalle[]) => {
      this.requerimientoDetalles = res
      //console.log(this.requerimientoDetalles)
    });
  }

  getUsersForPage(): RequerimientoDetalle[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.requerimientoDetalles.slice(startIndex, endIndex);
  }
  getTotalPages(): number {
    return Math.ceil(this.requerimientoDetalles.length / this.itemsPerPage);
  }

  getPages(): number[] {
    return Array(this.getTotalPages())
      .fill(0)
      .map((_, index) => index + 1);
  }


  aprobarRequerimiento() {
    this.revision.Id = this.datosRuta.Id
    this.revision.UsuarioIdAprobador=this.datosUsuario.Id
    //console.log( this.revision);
    this.crudService.revisionAprobada(this.revision).subscribe(
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

  denegarRequerimiento() {
    this.revision.Id = this.datosRuta.Id
    this.revision.UsuarioIdAprobador=this.datosUsuario.Id
    console.log( this.revision);
    this.crudService.revisionDenegada(this.revision).subscribe(
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


}
