// view-start-mobile.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-view-start-mobile',
  templateUrl: './view-start-mobile.component.html',
  styleUrls: ['./view-start-mobile.component.scss'],
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.95)',
          filter: 'blur(0)'
        }),
        animate('300ms ease-out', style({
          opacity: 1,
          transform: 'scale(1)',
          filter: 'blur(20px)'
        }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({
          opacity: 0,
          transform: 'scale(0.95)',
          filter: 'blur(0)'
        }))
      ])
    ])
  ]
})
export class ViewStartMobileComponent implements OnInit, OnDestroy {

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
    }
  ];

  currentHeaderIndex = 0;
  currentText1 = this.slides_header[0].text1;
  currentText2 = this.slides_header[0].text2;
  currentText3 = this.slides_header[0].text3;
  currentStyleClass = this.slides_header[0].styleClass;
  private headerInterval: any;

  ngOnInit() {
    this.startHeaderCarousel();
  }

  ngOnDestroy() {
    if (this.headerInterval) {
      clearInterval(this.headerInterval);
    }
  }

  private startHeaderCarousel() {
    this.headerInterval = setInterval(() => {
      this.currentHeaderIndex = (this.currentHeaderIndex + 1) % this.slides_header.length;
      this.currentText1 = this.slides_header[this.currentHeaderIndex].text1;
      this.currentText2 = this.slides_header[this.currentHeaderIndex].text2;
      this.currentText3 = this.slides_header[this.currentHeaderIndex].text3;
      this.currentStyleClass = this.slides_header[this.currentHeaderIndex].styleClass;
    }, 3000); // Cambia cada 3 segundos
  }

  isWalletsVisible = false;

  showWallets() {
    this.isWalletsVisible = true;
  }

  hideWallets() {
    this.isWalletsVisible = false;
  }
}