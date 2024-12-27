import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-view-start',
  templateUrl: './view-start.component.html',
  styleUrls: ['./view-start.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewStartComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Variables para el overlay de licencias
  isLicensesVisible: boolean = false;
  isWalletsVisible: boolean = false;
  isMoviesVisible: boolean = false;
  selectedBoxId: number = 0;

  slides_header = [
    {
      text1: 'Haz que tu',
      text2: 'DINERO TRABAJE',
      text3: 'para ti a partir de hoy mismo',
      styleClass: 'style1'
    },
    {
      text1: 'Invierte ',
      text2: 'como los',
      text3: 'PROFESIONALES',
      styleClass: 'style2'
    },
  ];

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

  currentHeaderIndex = 0;
  currentIndex = 0;
  currentTitle = this.slides[0].title;
  currentText = this.slides[0].text;
  currentImage = this.slides[0].image;
  currentText1 = this.slides_header[0].text1;
  currentText2 = this.slides_header[0].text2;
  currentText3 = this.slides_header[0].text3;
  currentStyleClass = this.slides_header[0].styleClass;

  private readonly sections = {
    'logo': 'parent-body-1',
    'nosotros': 'parent-body-2',
    'estrategia': 'parent-body-3',
    'licencias': 'parent-body-4',
    'clientes': 'parent-body-5'
  };

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Precarga de imágenes para mejorar rendimiento
    this.preloadImages();
    this.startCarousel();
    this.startHeaderCarousel();

    this.route.fragment
      .pipe(takeUntil(this.destroy$))
      .subscribe(fragment => {
        if (fragment) {
          this.scrollToSection(fragment);
        }
      });
  }

  private preloadImages(): void {
    this.slides.forEach(slide => {
      if (slide.image) {
        const img = new Image();
        img.src = slide.image;
      }
    });
  }

  private startCarousel() {
    interval(3000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.currentTitle = this.slides[this.currentIndex].title;
        this.currentText = this.slides[this.currentIndex].text;
        this.currentImage = this.slides[this.currentIndex].image;
        this.cdr.markForCheck();
      });
  }

  private startHeaderCarousel() {
    interval(10000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.currentHeaderIndex = (this.currentHeaderIndex + 1) % this.slides_header.length;
        this.currentText1 = this.slides_header[this.currentHeaderIndex].text1;
        this.currentText2 = this.slides_header[this.currentHeaderIndex].text2;
        this.currentText3 = this.slides_header[this.currentHeaderIndex].text3;
        this.currentStyleClass = this.slides_header[this.currentHeaderIndex].styleClass;
        this.cdr.markForCheck();
      });
  }

  showWallets() {
    this.isWalletsVisible = true;
    this.cdr.markForCheck();
  }

  hideWallets() {
    this.isWalletsVisible = false;
    this.cdr.markForCheck();
  }

  showLicenses(boxId: number) {
    this.selectedBoxId = boxId;
    this.isLicensesVisible = true;
    document.body.style.overflow = 'hidden';
    this.cdr.markForCheck();
  }

  hideLicenses() {
    this.isLicensesVisible = false;
    document.body.style.overflow = 'auto';
    this.cdr.markForCheck();
  }

  showMovies() {
    this.isMoviesVisible = true;
    this.cdr.markForCheck();
  }

  hideMovies() {
    this.isMoviesVisible = false;
    this.cdr.markForCheck();
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
