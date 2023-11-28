import { Component, OnInit } from '@angular/core';
import { CrudService } from './services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Requerimientos';

  constructor(private crudService: CrudService){
  }
  
  ngOnInit(): void {
  this.iniciarBackend()
  }

  //una vez que se inicie el fronted llama al backend para que tambien inicie
  iniciarBackend() {
    try {
      this.crudService.getApiStatus2().subscribe(
        (res) => {
          //console.log('Respuesta del servidor (getApiStatus2):', res);
        },
        (error) => {
          //console.error('Error al llamar a la API (getApiStatus2):', error);
        }
      );
  
      this.crudService.getApiStatus().subscribe(
        (res) => {
          //console.log('Respuesta del servidor (getApiStatus):', res);
        },
        (error) => {
          //console.error('Error al llamar a la API (getApiStatus):', error);
        }
      );
    } catch (error) {
      //console.error('Error inesperado:', error);
    }
  }
  
}
