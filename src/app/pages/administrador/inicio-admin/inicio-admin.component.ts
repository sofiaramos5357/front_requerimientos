import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.css'],
})
export class InicioAdminComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private datosUsuarioService: DatosUsuarioService
  ) {
    this.elementos = {
      Titulo1: 'Requerimientos en Proceso',
      cantidad1: 0,
      Titulo2: 'Revisar Requerimientos',
      cantidad2: 0,
      Titulo3: 'Documentar Requerimientos',
      cantidad3: 0,
    };
  }

  requerimientos: any;
  requerimientosaRevisar: any;
  requerimientosaDocumentar: any;

  datosUsuario: Usuario;

  elementos: {
    Titulo1: 'Requerimientos en Proceso';
    cantidad1: 0;
    Titulo2: 'Revisar Requerimientos';
    cantidad2: 0;
    Titulo3: 'Documentar Requerimientos';
    cantidad3: 0;
  };

  ngOnInit(): void {
    this.DatosUsuario();
  }

  DatosUsuario() {
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
        this.datosUsuario = response[0];
        this.requerimientosARevisar(this.datosUsuario.Id);
        this.requerimientosADocumentar(this.datosUsuario.Id);
        this.requerimientosCreadod();
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  requerimientosCreadod() {
    this.crudService.TotalRequerimientoscreadas().subscribe((res: any) => {
      //this.requerimientos = res.TotalReqCreado;
      this.elementos.cantidad1 = res.TotalReqCreado;
      //console.log(this.requerimientos);
    });
  }

  requerimientosARevisar(Id) {
    this.crudService.TotalRequerimientosARevisar(Id).subscribe((res: any) => {
      //this.requerimientosaRevisar = res.TotalReqRevisar;
      this.elementos.cantidad2 = res.TotalReqRevisar;
      //console.log(this.requerimientosaRevisar);
    });
  }

  requerimientosADocumentar(Id) {
    this.crudService
      .TotalRequerimientosADocumentar(Id)
      .subscribe((res: any) => {
        //this.requerimientosaDocumentar = res.TotalReqDocumentar;
        this.elementos.cantidad3 = res.TotalReqDocumentar;
        //console.log(this.requerimientosaDocumentar);
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
