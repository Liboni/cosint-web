/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AboutUsHistoryService } from './about-us-history.service';

describe('Service: AboutUsHistory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AboutUsHistoryService]
    });
  });

  it('should ...', inject([AboutUsHistoryService], (service: AboutUsHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
