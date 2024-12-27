import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-card',
  templateUrl: './start-card.component.html',
  styleUrls: ['./start-card.component.scss']
})
export class StartCardComponent implements OnInit {
  isOpen: boolean = false;
  title: string = 'Comunicado Importante';

  ngOnInit() {
    // Eliminar el setTimeout innecesario
    if (localStorage.getItem('shouldShowModal') !== 'false') {
      this.isOpen = true; // Mostrar inmediatamente
    }

    // Optimizar el manejo del estado
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('shouldShowModal', 'true');
    });
  }

  closeModal() {
    this.isOpen = false;
    localStorage.setItem('shouldShowModal', 'false'); // Guardar preferencia
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  ngOnDestroy() {
    // Limpiar el event listener
    window.removeEventListener('beforeunload', () => {});
  }
}
