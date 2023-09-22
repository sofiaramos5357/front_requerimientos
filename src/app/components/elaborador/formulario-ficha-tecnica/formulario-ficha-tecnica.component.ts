import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FichaTecnica } from 'src/app/models/ficha-tecnica.model';
import { CrudService } from 'src/app/services/crud.service';
import * as alertifyjs from 'alertifyjs';
import { TipoCambio } from 'src/app/models/tipo-cambio.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario-ficha-tecnica',
  templateUrl: './formulario-ficha-tecnica.component.html',
  styleUrls: ['./formulario-ficha-tecnica.component.css']
})
export class FormularioFichaTecnicaComponent implements OnInit{

  constructor(
    private crudService: CrudService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.obtenerTipoCambio()
    this.obtenerDatosRuta()
  }

  fichaTecnica = {
    Id:0,
    TiempoEstimadoHrs:0,
    TipoCambioId:0,
    Observaciones:''
  };

  tipoCambios:TipoCambio[]
  datosRuta: number

  camposLlenos(): boolean {
    // Verifica si todos los campos obligatorios están llenos
    return (
      this.fichaTecnica.Observaciones.trim() !== '' &&
      this.fichaTecnica.TipoCambioId !== 0 &&
      this.fichaTecnica.TiempoEstimadoHrs !== 0
    );
  }


  guardarFichaTecnica() {
    this.fichaTecnica.Id=this.datosRuta
    //console.log(this.fichaTecnica)
    this.crudService.registrarFichaTecnica(this.fichaTecnica).subscribe(
      res => {
        this.router.navigate(['/home']);
        alertifyjs.success(res.message)
      },
      (error) => {
      }
    );
  }

  obtenerTipoCambio(){
    this.crudService.getTipoCambios().subscribe((res: TipoCambio[]) => {
      //console.log(res);
      this.tipoCambios = res
    })
  }

  obtenerDatosRuta() {
    // Recupera los datos pasados a través de los parámetros de la ruta
    this.route.queryParams.subscribe(params => {
      const requerimientoParamId = params['requerimiento'];
      //console.log(requerimientoParam);
      if (requerimientoParamId) {
        try {
          const requerimientoId = JSON.parse(requerimientoParamId);
          // utilizar los datos de requerimiento en este componente
          this.datosRuta = requerimientoId
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

}
