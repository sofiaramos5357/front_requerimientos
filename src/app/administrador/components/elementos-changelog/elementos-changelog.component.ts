// Importa las clases y módulos necesarios desde Angular y otras ubicaciones
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { Changelog } from 'src/app/models/changelog.model';
import { RequerimientoDetalle } from 'src/app/models/requerimiento-detalle.model';

@Component({
  // Define el componente y configura su plantilla y hojas de estilo
  selector: 'app-elementos-changelog',
  templateUrl: './elementos-changelog.component.html',
  styleUrls: ['./elementos-changelog.component.css'],
})
export class ElementosChangelogComponent implements OnInit {
  constructor(
    // Constructor del componente que inyecta las dependencias necesarias
    private route: ActivatedRoute, // Objeto para acceder a los parámetros de la URL
    private crudService: CrudService // Servicio para realizar operaciones CRUD
  ) {}

  ngOnInit() {
    // Método que se ejecuta cuando se inicializa el componente
    this.obtenerDatosRuta(); // Llama a la función para obtener datos de la URL
  }

  // Declaración de variables miembro
  SistemaId: number; // Variable para almacenar el identificador del sistema
  changelog: Changelog; // Variable para almacenar un objeto Changelog
  requerimientoDetalles: RequerimientoDetalle[] = []; // Arreglo para almacenar detalles de requerimiento

  obtenerDatosRuta() {
    // Función para obtener datos de la URL
    this.route.queryParams.subscribe((params) => {
      const SistemaParam = params['sistemaId'];
      if (SistemaParam) {
        try {
          // Intenta analizar el parámetro 'sistemaId' de la URL como JSON
          const sistemaId = JSON.parse(SistemaParam);
          this.SistemaId = sistemaId; // Asigna el valor analizado a la variable 'SistemaId'
          this.obtenerChangelog(this.SistemaId); // Llama a la función para obtener el registro de Changelog
        } catch (error) {
          // Maneja cualquier error que ocurra al analizar el JSON
        }
      } else {
        // Maneja el caso en el que el parámetro 'sistemaId' no esté definido en la URL
      }
    });
  }

  obtenerChangelog(id) {
    // Función para obtener el registro de Changelog usando el servicio CRUD
    this.crudService.getChangelog(id).subscribe((res: Changelog) => {
      this.changelog = res[0]; // Almacena el primer registro de Changelog en la variable 'changelog'
      console.log(this.changelog); // Imprime el registro de Changelog en la consola
      this.obtenerActividadesRealizadas(this.changelog.RequerimientoCambioId); // Llama a la función para obtener detalles de requerimiento
    });
  }

  obtenerActividadesRealizadas(id) {
    // Función para obtener detalles de requerimiento usando el servicio CRUD
    this.crudService
      .getRequerimientoDetalle(id)
      .subscribe((res: RequerimientoDetalle[]) => {
        this.requerimientoDetalles = res; // Almacena los detalles de requerimiento en la variable 'requerimientoDetalles'
        //console.log(this.requerimientoDetalles); // Imprime los detalles de requerimiento en la consola
      });
  }
}
