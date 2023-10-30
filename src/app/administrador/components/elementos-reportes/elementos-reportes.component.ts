import { Component } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-elementos-reportes',
  templateUrl: './elementos-reportes.component.html',
  styleUrls: ['./elementos-reportes.component.css'],
})
export class ElementosReportesComponent {
  constructor(private crudService: CrudService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      fechaInicial: ['', [Validators.required, this.validateDate]],
      fechaFinal: ['', [Validators.required, this.validateDate]],
    });
  }

  registros: any[] = [];

  tamano: number;

  myForm: FormGroup;

  validateDate(control) {
    const datePattern =
      /^(0[1-9]|[1-2]\d|3[0-1])[\/-](0[1-9]|1[0-2])[\/-]\d{4}$/;
    const validDate = datePattern.test(control.value);
    return validDate ? null : { invalidDate: true };
  }

  existenRegistros() {
    // Obtiene los datos para enviar en el cuerpo de la solicitud POST
    const fechaInicialInput = this.myForm.value.fechaInicial.replace(
      /\//g,
      '-'
    );
    const fechaFinalInput = this.myForm.value.fechaFinal.replace(/\//g, '-');

    // Formatea las fechas en el formato "año-mes-día"
    const fechaInicial = this.formatFecha(fechaInicialInput);
    const fechaFinal = this.formatFecha(fechaFinalInput);

    // Obtiene los datos formateados para enviar en el cuerpo de la solicitud POST
    const data = {
      fechaInicial: fechaInicial,
      fechaFinal: fechaFinal,
    };

    this.crudService.existenRegistros(data).subscribe((res: any[]) => {
      this.registros = res;
      //console.log(this.registros.length);
      this.descargarExcel(this.registros, data);
    });
  }

  descargarExcel(registros, data) {
    if (registros.length !== 0) {
      // Llama a la función descargarExcel en el servicio
      this.crudService.descargarExcel(data).subscribe(
        (response: any) => {
          // Crea un objeto Blob a partir de la respuesta
          const blob = new Blob([response], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });

          // Crea un enlace para descargar el archivo
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'Reporte.xlsx';

          // Hace clic en el enlace para iniciar la descarga
          link.click();
        },
        (error) => {
          console.error(error);
          // Maneja el error aquí
        }
      );
      alertifyjs.success('Reporte generado correctamente.');
    } else {
      alertifyjs.error(
        'No se encontraron registros en el rango de fechas ingresado.'
      );
    }
  }

  // Función para formatear la fecha en "año-mes-día"
  formatFecha(fecha: string): string {
    const fechaPartes = fecha.split('-');
    if (fechaPartes.length === 3) {
      const dia = fechaPartes[0];
      const mes = fechaPartes[1];
      const anio = fechaPartes[2];
      return `${anio}-${mes}-${dia}`;
    } else {
      // Si la fecha no está en el formato esperado, devolverla sin cambios
      return fecha;
    }
  }
}
