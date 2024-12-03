import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLeaderComponent } from './profit-leader.component';

describe('ProfitLeaderComponent', () => {
  let component: ProfitLeaderComponent;
  let fixture: ComponentFixture<ProfitLeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfitLeaderComponent]
    });
    fixture = TestBed.createComponent(ProfitLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
