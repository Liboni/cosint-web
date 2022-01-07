/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AboutUsStatementService } from './about-us-statement.service';

describe('Service: AboutUsStatement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AboutUsStatementService]
    });
  });

  it('should ...', inject([AboutUsStatementService], (service: AboutUsStatementService) => {
    expect(service).toBeTruthy();
  }));
});
