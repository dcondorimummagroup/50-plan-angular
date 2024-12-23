import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCardComponent } from './start-card.component';

describe('StartCardComponent', () => {
  let component: StartCardComponent;
  let fixture: ComponentFixture<StartCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartCardComponent]
    });
    fixture = TestBed.createComponent(StartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
