import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileProfitPromoterComponent } from './mobile-profit-promoter.component';

describe('MobileProfitPromoterComponent', () => {
  let component: MobileProfitPromoterComponent;
  let fixture: ComponentFixture<MobileProfitPromoterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileProfitPromoterComponent]
    });
    fixture = TestBed.createComponent(MobileProfitPromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
