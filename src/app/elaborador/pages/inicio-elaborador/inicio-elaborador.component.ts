import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-inicio-elaborador',
  templateUrl: './inicio-elaborador.component.html',
  styleUrls: ['./inicio-elaborador.component.css'],
})
export class InicioElaboradorComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private datosUsuarioService: DatosUsuarioService
  ) {
    this.elementos = {
      Titulo1: 'Requerimientos Asignados',
      cantidad1: 0,
      Titulo2: 'Requerimientos en Proceso',
      cantidad2: 0,
      Titulo3: 'Requerimientos en Revisión',
      cantidad3: 0,
    };
  }

  requerimientos: any;
  reqPendientesRev: any;
  requerimientosProcesos: any;

  datosUsuario: Usuario;

  elementos: {
    Titulo1: 'Requerimientos Asignados';
    cantidad1: 0;
    Titulo2: 'Requerimientos en Proceso';
    cantidad2: 0;
    Titulo3: 'Requerimientos en Revisión';
    cantidad3: 0;
  };

  ngOnInit(): void {
    this.DatosUsuario();
  }

  DatosUsuario() {
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
        this.datosUsuario = response[0];
        //console.log(this.datosUsuario.Id);
        this.requerimientosAsignados(this.datosUsuario.Id);
        this.pendientesRevision(this.datosUsuario.Id);
        this.requerimientosProceso(this.datosUsuario.Id);
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  requerimientosAsignados(Id) {
    this.crudService.TotalRequerimientosAsignados(Id).subscribe((res: any) => {
      //this.requerimientos = res.TotalrequerimientoAsignado;
      this.elementos.cantidad1 = res.TotalrequerimientoAsignado;
      //console.log(this.requerimientos);
    });
  }
  requerimientosProceso(Id) {
    this.crudService.TotalRequerimientosProceso(Id).subscribe((res: any) => {
      //this.requerimientosProcesos = res.totalreqProceso;
      this.elementos.cantidad2 = res.totalreqProceso;
      //console.log(this.requerimientosProcesos);
    });
  }

  pendientesRevision(Id) {
    this.crudService.TotalPendienteRevisar(Id).subscribe((res: any) => {
      //this.reqPendientesRev = res.totalverReqPendienteRevision;
      this.elementos.cantidad3 = res.totalverReqPendienteRevision;

      //console.log(this.reqPendientesRev);
    });
  }

  btncheck1 = true;
  btncheck2 = true;
  btncheck3 = true;

  handleBotonMarcado(eventData: { id: string; marcado: boolean }) {
    // Accede a los datos del botón marcado y su estado
    const botonId = eventData.id;
    const marcado = eventData.marcado;

    //console.log('Botón:', botonId, 'Marcado:', marcado);

    if (botonId === 'btncheck1') {
      this.btncheck1 = marcado;
    } else if (botonId === 'btncheck2') {
      this.btncheck2 = marcado;
    } else if (botonId === 'btncheck3') {
      this.btncheck3 = marcado;
    }
  }
}
