import { TestBed } from '@angular/core/testing';

import { Orbit1PromoterService } from './orbit1-promoter.service';

describe('Orbit1PromoterService', () => {
  let service: Orbit1PromoterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Orbit1PromoterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
