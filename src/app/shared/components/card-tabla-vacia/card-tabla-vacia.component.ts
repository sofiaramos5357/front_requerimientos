import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-card-tabla-vacia',
  templateUrl: './card-tabla-vacia.component.html',
  styleUrls: ['./card-tabla-vacia.component.css'],
})
export class CardTablaVaciaComponent {
  //Recibe el mesaje que mostrara la card
  @Input() mensaje: string;
}
