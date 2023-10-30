import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbuttons',
  templateUrl: './checkbuttons.component.html',
  styleUrls: ['./checkbuttons.component.css'],
})
export class CheckbuttonsComponent {
  @Input() elementos: any; // Propiedad de entrada para recibir elementos
  @Output() botonMarcado = new EventEmitter<{ id: string; marcado: boolean }>(); // Evento de salida para notificar cuando se marca un botón

  // Método llamado cuando se marca o desmarca un botón
  marcarBoton(botonId: string) {
    const boton = document.getElementById(botonId) as HTMLInputElement; // Obtener el elemento HTML del botón por su ID
    const marcado = boton.checked; // Verificar si el botón está marcado
    this.botonMarcado.emit({ id: botonId, marcado }); // Emitir un evento para notificar el estado del botón (marcado o no)
  }
}
