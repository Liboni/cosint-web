/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResourceStatementService } from './resource-statement.service';

describe('Service: ResourceStatement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResourceStatementService]
    });
  });

  it('should ...', inject([ResourceStatementService], (service: ResourceStatementService) => {
    expect(service).toBeTruthy();
  }));
});
