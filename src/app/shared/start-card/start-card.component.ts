import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-start-card',
  templateUrl: './start-card.component.html',
  styleUrls: ['./start-card.component.scss']
})
export class StartCardComponent implements OnInit {
  isOpen: boolean = false;
  title: string = 'Comunicado Importante';

  ngOnInit() {
    // Verificar si hay un estado guardado en localStorage
    if (localStorage.getItem('shouldShowModal') === 'true') {
      this.showModal();
      localStorage.removeItem('shouldShowModal');
    } else {
      // Si no hay estado guardado, mostrar el modal normalmente
      this.showModal();
    }

    // Guardar estado antes de recargar
    window.onbeforeunload = () => {
      localStorage.setItem('shouldShowModal', 'true');
    }
  }

  showModal() {
    setTimeout(() => {
      this.isOpen = true;
    }, 100);
  }

  closeModal() {
    this.isOpen = false;
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }
 
}
