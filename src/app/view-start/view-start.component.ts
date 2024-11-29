import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-start',
  templateUrl: './view-start.component.html',
  styleUrls: ['./view-start.component.scss']
})
export class ViewStartComponent implements OnInit {
  // Variables para el overlay de licencias
  isLicensesVisible: boolean = false;
  selectedBoxId: number = 0;

  private readonly sections = {
    'logo': 'parent-body-1',
    'nosotros': 'parent-body-2',
    'estrategia': 'parent-body-3',
    'licencias': 'parent-body-4',
    'clientes': 'parent-body-5'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollToSection(fragment);
      }
    });
  }

  // Métodos para el manejo de licencias
  showLicenses(boxId: number) {
    this.selectedBoxId = boxId;
    this.isLicensesVisible = true;
    document.body.style.overflow = 'hidden';
  }

  hideLicenses() {
    this.isLicensesVisible = false;
    document.body.style.overflow = 'auto';
  }

  // Método opcional para recibir datos del componente licenses
  handleDataFromLicenses(data: any) {
    console.log('Datos recibidos del componente licenses:', data);
    // Implementar lógica según necesites
  }

  // Tus métodos existentes
  private scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 90;
      const currentScroll = window.scrollY;
      const viewportHeight = window.innerHeight;
      const targetPosition = element.offsetTop;
      const isScrollingDown = targetPosition > currentScroll;

      window.scrollTo({
        top: targetPosition - headerOffset,
        behavior: 'smooth'
      });
    }
  }

  private getCurrentSection(): string {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    return Object.entries(this.sections).find(([_, className]) => {
      const element = document.querySelector(`.${className}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom > 0;
      }
      return false;
    })?.[0] || 'logo';
  }

  // Método opcional para manejar la selección específica de cada box
  handleBoxSelection(boxId: number) {
    switch(boxId) {
      case 1:
        console.log('Licencia Starter seleccionada');
        break;
      case 2:
        console.log('Licencia Professional seleccionada');
        break;
      case 3:
        console.log('Licencia Business seleccionada');
        break;
      case 4:
        console.log('Licencia Enterprise seleccionada');
        break;
    }
    this.showLicenses(boxId);
  }
}