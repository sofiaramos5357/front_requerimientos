import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal-confirmar-eliminar',
  templateUrl: './modal-confirmar-eliminar.component.html',
  styleUrls: ['./modal-confirmar-eliminar.component.css'],
})
export class ModalConfirmarEliminarComponent {
  @Output() eliminarRequerimientoModal = new EventEmitter<{
    eliminar: boolean;
  }>(); // Evento de salida para notificar si se debe eliminar algo
  @Input() palabraModal: string; // Propiedad de entrada para mostrar una palabra o mensaje en el modal

  Eliminar(): void {
    const eliminar = true; // Define la variable eliminar como verdadera
    this.eliminarRequerimientoModal.emit({ eliminar }); // Emite el evento para notificar que se debe eliminar algo
  }
}
