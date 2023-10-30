// Importación de módulos y clases necesarios
import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

// Declaración del componente
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
    // Inicialización de elementos con títulos y cantidades
    this.elementos = {
      Titulo1: 'Requerimientos en Proceso',
      cantidad1: 0,
      Titulo2: 'Revisar Requerimientos',
      cantidad2: 0,
      Titulo3: 'Documentar Requerimientos',
      cantidad3: 0,
    };
  }

  // Declaración de variables de clase
  requerimientos: any;
  requerimientosaRevisar: any;
  requerimientosaDocumentar: any;
  datosUsuario: Usuario;

  // Objeto elementos que almacena títulos y cantidades
  elementos: {
    Titulo1: string;
    cantidad1: number;
    Titulo2: string;
    cantidad2: number;
    Titulo3: string;
    cantidad3: number;
  };

  ngOnInit(): void {
    this.DatosUsuario();
  }

  // Función para obtener los datos del usuario actual
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

  // Función para obtener el total de requerimientos creados
  requerimientosCreadod() {
    this.crudService.TotalRequerimientoscreadas().subscribe((res: any) => {
      this.elementos.cantidad1 = res.TotalReqCreado;
    });
  }

  // Función para obtener el total de requerimientos a revisar
  requerimientosARevisar(Id) {
    this.crudService.TotalRequerimientosARevisar(Id).subscribe((res: any) => {
      this.elementos.cantidad2 = res.TotalReqRevisar;
    });
  }

  // Función para obtener el total de requerimientos a documentar
  requerimientosADocumentar(Id) {
    this.crudService
      .TotalRequerimientosADocumentar(Id)
      .subscribe((res: any) => {
        this.elementos.cantidad3 = res.TotalReqDocumentar;
      });
  }

  // Variables para controlar el estado de los botones de marcado
  btncheck1 = true;
  btncheck2 = true;
  btncheck3 = true;

  // Función para manejar el marcado de los botones
  handleBotonMarcado(eventData: { id: string; marcado: boolean }) {
    // Accede a los datos del botón marcado y su estado
    const botonId = eventData.id;
    const marcado = eventData.marcado;

    // Actualiza el estado de los botones según el botón marcado
    if (botonId === 'btncheck1') {
      this.btncheck1 = marcado;
    } else if (botonId === 'btncheck2') {
      this.btncheck2 = marcado;
    } else if (botonId === 'btncheck3') {
      this.btncheck3 = marcado;
    }
  }
}
