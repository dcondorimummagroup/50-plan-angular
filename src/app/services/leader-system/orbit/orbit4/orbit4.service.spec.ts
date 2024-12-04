import { TestBed } from '@angular/core/testing';

import { Orbit4Service } from './orbit4.service';

describe('Orbit4Service', () => {
  let service: Orbit4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Orbit4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
