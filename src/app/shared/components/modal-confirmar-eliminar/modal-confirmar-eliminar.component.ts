import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal-confirmar-eliminar',
  templateUrl: './modal-confirmar-eliminar.component.html',
  styleUrls: ['./modal-confirmar-eliminar.component.css']
})
export class ModalConfirmarEliminarComponent {
  @Output() eliminarRequerimientoModal = new EventEmitter<{eliminar: boolean }>();
  @Input() palabraModal: string;


  Eliminar(): void {
    const eliminar=true;
    this.eliminarRequerimientoModal.emit({eliminar});
  }

}