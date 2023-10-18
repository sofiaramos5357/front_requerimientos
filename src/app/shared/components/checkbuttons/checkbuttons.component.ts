import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbuttons',
  templateUrl: './checkbuttons.component.html',
  styleUrls: ['./checkbuttons.component.css'],
})
export class CheckbuttonsComponent {
  @Input() elementos: any;
  @Output() botonMarcado = new EventEmitter<{ id: string; marcado: boolean }>();

  marcarBoton(botonId: string) {
    const boton = document.getElementById(botonId) as HTMLInputElement;
    const marcado = boton.checked;
    this.botonMarcado.emit({ id: botonId, marcado });
  }
}
