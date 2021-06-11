import { TestBed } from '@angular/core/testing';

import { ConexService } from './conex.service';

describe('ConexService', () => {
  let service: ConexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
