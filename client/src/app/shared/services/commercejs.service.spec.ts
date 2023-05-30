import { TestBed } from '@angular/core/testing';

import { CommercejsService } from './commercejs.service';

describe('CommercejsService', () => {
  let service: CommercejsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommercejsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
