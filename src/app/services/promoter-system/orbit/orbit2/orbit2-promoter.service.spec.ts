import { TestBed } from '@angular/core/testing';

import { Orbit2PromoterService } from './orbit2-promoter.service';

describe('Orbit2PromoterService', () => {
  let service: Orbit2PromoterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Orbit2PromoterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
