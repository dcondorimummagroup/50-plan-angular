import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStartMobileComponent } from './view-start-mobile.component';

describe('ViewStartMobileComponent', () => {
  let component: ViewStartMobileComponent;
  let fixture: ComponentFixture<ViewStartMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStartMobileComponent]
    });
    fixture = TestBed.createComponent(ViewStartMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
