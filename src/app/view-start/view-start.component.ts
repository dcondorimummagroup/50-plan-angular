import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-start',
  templateUrl: './view-start.component.html',
  styleUrls: ['./view-start.component.scss']
})
export class ViewStartComponent implements OnInit, OnDestroy {
  // Variables para el overlay de licencias
  isLicensesVisible: boolean = false;
  selectedBoxId: number = 0;

  // Variables nuevas para el carrusel
  private interval: any;
  currentIndex = 0;
  
  slides = [
    {
      title: 'Años de Experiencia',
      text: 'Acompañando a miles de usuarios en su viaje a la autonomía de su capital.',
      image: '/assets/image/8.webp'
    },
    {
      title: 'Transacciones',
      text: 'Completadas y realizadas cada viernes, y además de un bono cada fin de mes.',
      image: '/assets/image/75.webp'
    },
    {
      title: 'De dólares en transacciones',
      text: 'Reafirmando el compromiso que tenemos con nuestros clientes, y la tasa de éxito asegurada',
      image: '/assets/image/20.webp'
    }
  ];
  

  
  currentTitle = this.slides[0].title;
  currentText = this.slides[0].text;
  currentImage = this.slides[0].image;


  private readonly sections = {
    'logo': 'parent-body-1',
    'nosotros': 'parent-body-2',
    'estrategia': 'parent-body-3',
    'licencias': 'parent-body-4',
    'clientes': 'parent-body-5'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Inicializar el carrusel
    this.startCarousel();

    // Código existente
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollToSection(fragment);
      }
    });
  }

  ngOnDestroy() {
    // Limpiar el intervalo cuando el componente se destruye
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  private startCarousel() {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.currentTitle = this.slides[this.currentIndex].title;
      this.currentText = this.slides[this.currentIndex].text;
      this.currentImage = this.slides[this.currentIndex].image;
    }, 3000);
  }
  

  showLicenses(boxId: number) {
    this.selectedBoxId = boxId;
    this.isLicensesVisible = true;
    document.body.style.overflow = 'hidden';
  }

  hideLicenses() {
    this.isLicensesVisible = false;
    document.body.style.overflow = 'auto';
  }

  private scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 90;
      const targetPosition = element.offsetTop;
      window.scrollTo({
        top: targetPosition - headerOffset,
        behavior: 'smooth'
      });
    }
  }

  private getCurrentSection(): string {
    const scrollPosition = window.scrollY;
    return Object.entries(this.sections).find(([_, className]) => {
      const element = document.querySelector(`.${className}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom > 0;
      }
      return false;
    })?.[0] || 'logo';
  }

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