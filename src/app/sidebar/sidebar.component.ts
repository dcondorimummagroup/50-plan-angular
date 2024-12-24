import { Component, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  private touchStartX = 0;
  private readonly SWIPE_THRESHOLD = 50;
  private menuElement: Element | null = null;
  private toggleButton: Element | null = null;

  constructor(
    private router: Router,
    private elementRef: ElementRef
  ) {}

  // Optimizado toggleMenu sin delay
  toggleMenu(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    requestAnimationFrame(() => {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
    });
  }

  // Soporte para gestos táctiles
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - this.touchStartX;

    if (Math.abs(deltaX) > this.SWIPE_THRESHOLD) {
      if (deltaX > 0 && !this.isMenuOpen) {
        this.toggleMenu();
      } else if (deltaX < 0 && this.isMenuOpen) {
        this.toggleMenu();
      }
    }
  }

  // Click handler optimizado
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isMenuOpen) return;

    const target = event.target as HTMLElement;
    if (!target.closest('.side-menu') && !target.closest('.menu-button')) {
      this.toggleMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
  }

  // Navegación optimizada
  goToSection(section: string, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.isMenuOpen) {
      this.toggleMenu();
    }
    
    if (this.router.url !== '/') {
      this.router.navigate(['/'])
        .then(() => this.scrollToSection(section));
    } else {
      this.scrollToSection(section);
    }
  }

  private scrollToSection(section: string): void {
    requestAnimationFrame(() => {
      const element = document.getElementById(section);
      if (!element) return;

      const headerOffset = 90;
      const targetPosition = element.offsetTop - headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  }

  // Navegación externa optimizada
  goToLogin(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
    window.location.href = 'https://app.50plan.pro/login';
  }

  goToRegister(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
    window.location.href = 'https://app.50plan.pro/register';
  }

  ngOnInit(): void {
    // Inicialización optimizada
    this.menuElement = this.elementRef.nativeElement.querySelector('.side-menu');
    this.toggleButton = this.elementRef.nativeElement.querySelector('.menu-button');
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
    this.menuElement = null;
    this.toggleButton = null;
  }
}