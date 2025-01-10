import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carousel-nosotros',
  templateUrl: './carousel-nosotros.component.html',
  styleUrls: ['./carousel-nosotros.component.scss']
})
export class CarouselNosotrosComponent {
  @ViewChild('carouselContainer') private container!: ElementRef<HTMLElement>;
  
  currentSlide = 0;
  private touchStartX: number | null = null;
  private readonly TOTAL_SLIDES = 3; // Cambiado a 4
  private readonly SWIPE_THRESHOLD = 50;
  
  isLicensesVisible: boolean = false;
  selectedBoxId: number = 0;

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    const options = {
      root: this.container.nativeElement,
      threshold: 0.6 // Ajusta este valor según necesites
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const slideIndex = parseInt(entry.target.getAttribute('data-index') || '0');
          this.currentSlide = slideIndex;
        }
      });
    }, options);

    // Observar cada card
    const cards = this.container.nativeElement.querySelectorAll('.item-1, .item-2, .item-3');
    cards.forEach((card, index) => {
      card.setAttribute('data-index', index.toString());
      observer.observe(card);
    });
  }

  isActive(index: number): boolean {
    return this.currentSlide === index;
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < this.TOTAL_SLIDES) {
      this.currentSlide = index;
      this.container.nativeElement.scrollTo({
        left: this.container.nativeElement.clientWidth * index,
        behavior: 'smooth'
      });
    }
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
}