import { TestBed } from '@angular/core/testing';

import { Orbit4PromoterService } from './orbit4-promoter.service';

describe('Orbit4PromoterService', () => {
  let service: Orbit4PromoterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Orbit4PromoterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
