import { Component } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-elementos-reportes',
  templateUrl: './elementos-reportes.component.html',
  styleUrls: ['./elementos-reportes.component.css']
})
export class ElementosReportesComponent {

    constructor(
      private crudService: CrudService,
    ) {}

  fechasCreacion={
    fechaInicial:"2023-10-05",
    fechaFinal:"2023-10-05"
  }

  descargarExcel() {
    // Obtiene los datos para enviar en el cuerpo de la solicitud POST
    const data = {
      fechaInicial: "2023-10-05",
      fechaFinal: "2023-10-05"
    };
  
    // Llama a la función descargarExcel en el servicio
    this.crudService.descargarExcel(data).subscribe(
      (response: any) => {
        // Crea un objeto Blob a partir de la respuesta
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
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
  }
  
}
