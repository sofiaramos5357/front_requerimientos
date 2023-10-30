import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import * as alertifyjs from 'alertifyjs';
import { TipoCambio } from 'src/app/models/tipo-cambio.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario-ficha-tecnica',
  templateUrl: './formulario-ficha-tecnica.component.html',
  styleUrls: ['./formulario-ficha-tecnica.component.css'],
})
export class FormularioFichaTecnicaComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Método que se ejecuta al inicializar el componente.
    this.obtenerTipoCambio(); // Obtiene los tipos de cambio activos.
    this.obtenerDatosRuta(); // Obtiene los datos de la ruta.
    this.mensajeAlmacenado(); // Muestra un mensaje almacenado si existe.
  }
  
  fichaTecnica = {
    Id: 0,
    TiempoEstimadoHrs: 0,
    TipoCambioId: 0,
    Observaciones: '',
  }; // Almacena información de la ficha técnica.
  
  tipoCambios: TipoCambio[]; // Almacena una lista de tipos de cambio.
  datosRuta: number; // Almacena datos relacionados con la ruta.
  
  tipoCambio: TipoCambio = {
    Id: 0,
    Nombre: '',
    Activo: true,
  }; // Almacena información de un tipo de cambio que se está creando.
  
  camposLlenos(): boolean {
    // Verifica si todos los campos obligatorios están llenos.
    return (
      this.fichaTecnica.TipoCambioId !== 0 &&
      this.fichaTecnica.TiempoEstimadoHrs > 0
    );
  }
  
  guardarFichaTecnica() {
    // Guarda la ficha técnica y redirige a una página específica.
    this.fichaTecnica.Id = this.datosRuta;
    this.crudService.registrarFichaTecnica(this.fichaTecnica).subscribe(
      (res) => {
        this.router.navigate(['/home/elaborador']);
        alertifyjs.success(res.message);
      },
      (error) => {
        // Manejar errores aquí.
      }
    );
  }
  
  obtenerTipoCambio() {
    // Obtiene los tipos de cambio activos y almacena en 'tipoCambios'.
    this.crudService.getTipoCambioActivos().subscribe((res: TipoCambio[]) => {
      this.tipoCambios = res;
    });
  }
  
  obtenerDatosRuta() {
    // Recupera los datos pasados a través de los parámetros de la ruta.
    this.route.queryParams.subscribe((params) => {
      const requerimientoParamId = params['requerimiento'];
      if (requerimientoParamId) {
        try {
          const requerimientoId = JSON.parse(requerimientoParamId);
          this.datosRuta = requerimientoId;
        } catch (error) {
          console.error('Error al analizar JSON:', error);
        }
      } else {
        console.error("El parámetro 'requerimiento' es undefined o null");
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
    // Verificar si hay un mensaje almacenado en el almacenamiento local y mostrarlo.
    const mensaje = localStorage.getItem('mensaje');
    if (mensaje) {
      alertifyjs.success(mensaje);
      localStorage.removeItem('mensaje'); // Limpiar el mensaje almacenado.
    }
  }
  
  guardarTipoCambio() {
    // Crea un nuevo tipo de cambio y almacena un mensaje en el almacenamiento local antes de recargar.
    this.crudService.crearTipoCambio(this.tipoCambio).subscribe(
      (res) => {
        localStorage.setItem('mensaje', res.message);
        window.location.reload();
      },
      (error) => {
        // Manejar errores aquí.
      }
    );
  }
  
}
