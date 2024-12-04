import { TestBed } from '@angular/core/testing';

import { Orbit1Service } from './orbit1.service';

describe('Orbit1Service', () => {
  let service: Orbit1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Orbit1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
