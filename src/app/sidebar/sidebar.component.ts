import { Component, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  private isToggling = false;
  private menuElement: Element | null = null;
  private toggleButton: Element | null = null;
  private menuIcon: Element | null = null;

  constructor(
    private router: Router,
    private elementRef: ElementRef
  ) {}

  toggleMenu(event?: Event): void {
    if (this.isToggling) return;
    
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    this.isToggling = true;
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';

    // Reducido a 150ms
    setTimeout(() => this.isToggling = false, 150);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isMenuOpen) return;

    const target = event.target as Node;
    
    if (!this.menuElement?.contains(target) && 
        !this.toggleButton?.contains(target) && 
        !this.menuIcon?.contains(target)) {
      this.toggleMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    if (this.isMenuOpen && !this.isToggling) {
      this.toggleMenu();
    }
  }

  goToSection(section: string, event?: Event): void {
    if (this.isToggling) return;
    
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (this.router.url !== '/') {
      this.router.navigate(['/'])
        .then(() => requestAnimationFrame(() => this.scrollToSection(section)));
    } else {
      this.scrollToSection(section);
    }
  }

  private scrollToSection(section: string): void {
    const element = document.getElementById(section);
    if (!element) return;

    const headerOffset = 90;
    const targetPosition = element.offsetTop - headerOffset;
    
    requestAnimationFrame(() => {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  }

  private navigateAndToggle(route: string, event?: Event): void {
    if (this.isToggling) return;
    
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
    
    this.router.navigate([route]);
  }


  goToLogin(event?: Event): void {
    this.navigateAndToggle('/login', event);
  }

  goToRegister(event?: Event): void {
    this.navigateAndToggle('/register', event);
  }

  ngOnInit(): void {
    this.isMenuOpen = false;
    this.isToggling = false;
    document.body.style.overflow = 'auto';


    this.menuElement = this.elementRef.nativeElement.querySelector('.side-menu');
    this.toggleButton = this.elementRef.nativeElement.querySelector('.menu-button');
    this.menuIcon = this.elementRef.nativeElement.querySelector('.menu-icon');
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
    this.isToggling = false;
    

    this.menuElement = null;
    this.toggleButton = null;
    this.menuIcon = null;
  }
}