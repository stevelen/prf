import { TestBed } from '@angular/core/testing';

import { WebshopService } from './webshop.service';

describe('WebshopService', () => {
  let service: WebshopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebshopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
