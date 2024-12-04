import { TestBed } from '@angular/core/testing';

import { Orbit3Service } from './orbit3.service';

describe('Orbit3Service', () => {
  let service: Orbit3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Orbit3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
