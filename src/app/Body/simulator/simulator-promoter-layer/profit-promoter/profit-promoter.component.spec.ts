import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitPromoterComponent } from './profit-promoter.component';

describe('ProfitPromoterComponent', () => {
  let component: ProfitPromoterComponent;
  let fixture: ComponentFixture<ProfitPromoterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfitPromoterComponent]
    });
    fixture = TestBed.createComponent(ProfitPromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
