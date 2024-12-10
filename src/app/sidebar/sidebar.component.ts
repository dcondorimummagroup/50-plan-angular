import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isMenuOpen = false;
  private isToggling = false;

  constructor(private router: Router) {}

  toggleMenu(event?: Event): void {
    // Prevenir múltiples clicks
    if (this.isToggling) return;
    
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    this.isToggling = true;
    this.isMenuOpen = !this.isMenuOpen;
    
    // Manejar el scroll del body
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';

    // Desbloquear después de la animación
    setTimeout(() => {
      this.isToggling = false;
    }, 300);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const menuElement = document.querySelector('.side-menu');
    const toggleButton = document.querySelector('.menu-button');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (this.isMenuOpen && 
        menuElement && 
        !menuElement.contains(event.target as Node) &&
        toggleButton && 
        !toggleButton.contains(event.target as Node) &&
        menuIcon &&
        !menuIcon.contains(event.target as Node)) {
      requestAnimationFrame(() => {
        this.toggleMenu();
      });
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
        event.stopPropagation();
        event.preventDefault();
    }
    
    // Si estamos en una ruta diferente a home
    if (this.router.url !== '/') {
        this.router.navigate(['/']).then(() => {
            setTimeout(() => {
                this.scrollToSection(section);
                // Removemos esta línea para que no abra el menú
                // this.toggleMenu();
            }, 100);
        });
    } else {
        this.scrollToSection(section);
        // Removemos esta línea para que no abra el menú
        // this.toggleMenu();
    }
}

  private scrollToSection(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      const headerOffset = 90;
      const targetPosition = element.offsetTop - headerOffset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  goToLogin(event?: Event): void {
    if (this.isToggling) return;
    
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    // Solo toggle el menú si está abierto
    if (this.isMenuOpen) {
        this.toggleMenu();
    }
    
    this.router.navigate(['/login']);
  }

  goToRegister(event?: Event): void {
    if (this.isToggling) return;
    
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    // Solo toggle el menú si está abierto
    if (this.isMenuOpen) {
        this.toggleMenu();
    }
    
    this.router.navigate(['/register']);
  }

  ngOnInit(): void {
    this.isMenuOpen = false;
    this.isToggling = false;
    document.body.style.overflow = 'auto';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
    this.isToggling = false;
  }
}