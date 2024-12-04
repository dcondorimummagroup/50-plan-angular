import { TestBed } from '@angular/core/testing';

import { Orbit2Service } from './orbit2.service';

describe('Orbit2Service', () => {
  let service: Orbit2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Orbit2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
