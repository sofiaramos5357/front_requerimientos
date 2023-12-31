import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import * as alertifyjs from 'alertifyjs';
import { TipoCambio } from 'src/app/models/tipo-cambio.model';
import { ActivatedRoute } from '@angular/router';
import { DatosFichaTecnica } from 'src/app/models/datos-ficha-tecnica.model';

@Component({
  selector: 'app-formulario-modificar-ficha',
  templateUrl: './formulario-modificar-ficha.component.html',
  styleUrls: ['./formulario-modificar-ficha.component.css'],
})
export class FormularioModificarFichaComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  palabraModal: string = 'Ficha Técnica'; // Variable para almacenar la palabra a mostrar en el modal

  handleEliminar(eventData: { eliminar: boolean }) {
    this.eliminarFichaTecnica();
  }

  ngOnInit(): void {
    this.obtenerDatosRuta();
    this.obtenerTipoCambio();
    this.mensajeAlmacenado();
  }

  fichaTecnica = {
    Id: 0,
    TiempoEstimadoHrs: 0,
    TipoCambioId: 0,
    Observaciones: '',
  };

  tipoCambios: TipoCambio[];
  datosRuta: number;

  tipoCambio: TipoCambio = {
    Id: 0,
    Nombre: '',
    Activo: true,
  };

  datosFichaTecnica: DatosFichaTecnica;

  guardarFichaTecnica() {
    this.fichaTecnica.Id = this.datosRuta;
    //console.log(this.fichaTecnica)
    this.crudService.registrarFichaTecnica(this.fichaTecnica).subscribe(
      (res) => {
        this.router.navigate(['/home/elaborador']);
        alertifyjs.success(res.message);
      },
      (error) => {}
    );
  }

  eliminarFichaTecnica() {
    //console.log(this.datosRuta)
    this.crudService.eliminarFichaTecnica(this.datosRuta).subscribe(
      (res) => {
        this.router.navigate(['/home/elaborador']);
        alertifyjs.success(res.message);
      },
      (error) => {}
    );
  }

  obtenerTipoCambio() {
    this.crudService.getTipoCambioActivos().subscribe((res: TipoCambio[]) => {
      //console.log(res);
      this.tipoCambios = res;
    });
  }

  obtenerFichaTecnica(id) {
    this.crudService.getFichaTecnica(id).subscribe((res: DatosFichaTecnica) => {
      this.datosFichaTecnica = res[0];
      //console.log(this.datosFichaTecnica)
      this.fichaTecnica = {
        Id: 0,
        TiempoEstimadoHrs: this.datosFichaTecnica.TiempoEstimadoHrs,
        TipoCambioId: this.datosFichaTecnica.TipoCambioId,
        Observaciones: this.datosFichaTecnica.Observaciones,
      };
    });
  }

  obtenerDatosRuta() {
    // Recupera los datos pasados a través de los parámetros de la ruta
    this.route.queryParams.subscribe((params) => {
      const requerimientoParamId = params['requerimiento'];
      //console.log(requerimientoParam);
      if (requerimientoParamId) {
        try {
          const requerimientoId = JSON.parse(requerimientoParamId);
          // utilizar los datos de requerimiento en este componente
          this.datosRuta = requerimientoId;
          this.obtenerFichaTecnica(this.datosRuta);
        } catch (error) {
          console.error('Error al analizar JSON:', error);
          // Maneja el error de análisis JSON
        }
      } else {
        console.error("El parámetro 'requerimiento' es undefined o null");
        // Maneja el caso en el que el parámetro 'requerimiento' no esté definido
      }
    });
  }

  validarTipoCambio(): boolean {
    if (this.tipoCambio !== undefined) {
      return this.tipoCambio.Nombre.trim() !== '';
    }
    return false;
  }

  mensajeAlmacenado() {
    // Verificar si hay un mensaje almacenado en el almacenamiento local
    const mensaje = localStorage.getItem('mensaje');
    if (mensaje) {
      // Mostrar el mensaje con alertify o cualquier otro mecanismo de notificación
      alertifyjs.success(mensaje);

      // Limpiar el mensaje del almacenamiento local
      localStorage.removeItem('mensaje');
    }
  }

  guardarTipoCambio() {
    this.crudService.crearTipoCambio(this.tipoCambio).subscribe(
      (res) => {
        // Almacenar el mensaje en el almacenamiento local antes de recargar
        localStorage.setItem('mensaje', res.message);
        window.location.reload();
      },
      (error) => {}
    );
  }
}
