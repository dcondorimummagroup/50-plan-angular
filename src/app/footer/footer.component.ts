import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private cdr: ChangeDetectorRef) {}

  isMoviesVisible: boolean = false;
  showMovies() {
    this.isMoviesVisible = true;
    this.cdr.markForCheck();
    
  }

  hideMovies() {
    this.isMoviesVisible = false;
    this.cdr.markForCheck();
  }
}
