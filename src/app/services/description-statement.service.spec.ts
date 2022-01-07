/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DescriptionStatementService } from './description-statement.service';

describe('Service: DescriptionStatement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DescriptionStatementService]
    });
  });

  it('should ...', inject([DescriptionStatementService], (service: DescriptionStatementService) => {
    expect(service).toBeTruthy();
  }));
});
