import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileProfitLeaderComponent } from './mobile-profit-leader.component';

describe('MobileProfitLeaderComponent', () => {
  let component: MobileProfitLeaderComponent;
  let fixture: ComponentFixture<MobileProfitLeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileProfitLeaderComponent]
    });
    fixture = TestBed.createComponent(MobileProfitLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
