import { TestBed } from '@angular/core/testing';

import { Orbit5PromoterService } from './orbit5-promoter.service';

describe('Orbit5PromoterService', () => {
  let service: Orbit5PromoterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Orbit5PromoterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
