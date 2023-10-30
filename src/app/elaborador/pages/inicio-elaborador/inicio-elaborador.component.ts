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
    private crudService: CrudService, // Inyección del servicio 'CrudService'
    private datosUsuarioService: DatosUsuarioService // Inyección del servicio 'DatosUsuarioService'
  ) {
    // Inicialización de propiedades Al definir propiedades en el constructor,
    // puedes estar seguro de que tendrán un valor inicial conocido tan pronto como se cree una instancia del objeto. Esto evita que las propiedades tengan un valor 
    this.elementos = {
      Titulo1: 'Requerimientos Asignados',
      cantidad1: 0,
      Titulo2: 'Requerimientos en Proceso',
      cantidad2: 0,
      Titulo3: 'Requerimientos en Revisión',
      cantidad3: 0,
    };
  }

  requerimientos: any; // Almacenará los requerimientos
  reqPendientesRev: any; // Almacenará los requerimientos pendientes de revisión
  requerimientosProcesos: any; // Almacenará los requerimientos en proceso

  datosUsuario: Usuario; // Almacenará los datos del usuario

  elementos: { // Definición de un objeto con títulos y cantidades
    Titulo1: 'Requerimientos Asignados',
    cantidad1: 0,
    Titulo2: 'Requerimientos en Proceso',
    cantidad2: 0,
    Titulo3: 'Requerimientos en Revisión',
    cantidad3: 0,
  };

  ngOnInit(): void {
    this.DatosUsuario(); // Llamada a la función 'DatosUsuario' en la inicialización del componente
  }

  DatosUsuario() {
    // Obtiene los datos del usuario desde el servicio 'DatosUsuarioService'
    this.datosUsuarioService.DatosUsuario().subscribe(
      (response) => {
        this.datosUsuario = response[0]; // Almacena los datos del usuario
        this.requerimientosAsignados(this.datosUsuario.Id); // Llama a la función para obtener los requerimientos asignados
        this.pendientesRevision(this.datosUsuario.Id); // Llama a la función para obtener los requerimientos pendientes de revisión
        this.requerimientosProceso(this.datosUsuario.Id); // Llama a la función para obtener los requerimientos en proceso
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error); // Manejo de errores
      }
    );
  }

  requerimientosAsignados(Id) {
    // Obtiene el total de requerimientos asignados desde el servicio 'CrudService'
    this.crudService.TotalRequerimientosAsignados(Id).subscribe((res: any) => {
      this.elementos.cantidad1 = res.TotalrequerimientoAsignado; // Almacena el total en la propiedad 'cantidad1'
    });
  }
  requerimientosProceso(Id) {
    // Obtiene el total de requerimientos en proceso desde el servicio 'CrudService'
    this.crudService.TotalRequerimientosProceso(Id).subscribe((res: any) => {
      this.elementos.cantidad2 = res.totalreqProceso; // Almacena el total en la propiedad 'cantidad2'
    });
  }

  pendientesRevision(Id) {
    // Obtiene el total de requerimientos pendientes de revisión desde el servicio 'CrudService'
    this.crudService.TotalPendienteRevisar(Id).subscribe((res: any) => {
      this.elementos.cantidad3 = res.totalverReqPendienteRevision; // Almacena el total en la propiedad 'cantidad3'
    });
  }

  btncheck1 = true; // Variable para controlar el estado del botón 1
  btncheck2 = true; // Variable para controlar el estado del botón 2
  btncheck3 = true; // Variable para controlar el estado del botón 3

  handleBotonMarcado(eventData: { id: string; marcado: boolean }) {
    // Función para manejar eventos de marcado de botones
    const botonId = eventData.id; // Obtiene el ID del botón
    const marcado = eventData.marcado; // Obtiene el estado de marcado del botón

    if (botonId === 'btncheck1') {
      this.btncheck1 = marcado; // Actualiza el estado del botón 1
    } else if (botonId === 'btncheck2') {
      this.btncheck2 = marcado; // Actualiza el estado del botón 2
    } else if (botonId === 'btncheck3') {
      this.btncheck3 = marcado; // Actualiza el estado del botón 3
    }
  }
}
