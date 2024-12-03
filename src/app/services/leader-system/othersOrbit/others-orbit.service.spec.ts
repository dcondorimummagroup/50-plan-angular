import { TestBed } from '@angular/core/testing';

import { OthersOrbitService } from './others-orbit.service';

describe('OthersOrbitService', () => {
  let service: OthersOrbitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OthersOrbitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
