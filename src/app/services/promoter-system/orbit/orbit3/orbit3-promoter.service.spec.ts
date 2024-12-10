import { TestBed } from '@angular/core/testing';

import { Orbit3PromoterService } from './orbit3-promoter.service';

describe('Orbit3PromoterService', () => {
  let service: Orbit3PromoterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Orbit3PromoterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
