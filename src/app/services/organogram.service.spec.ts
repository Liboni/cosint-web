/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrganogramService } from './organogram.service';

describe('Service: Organogram', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganogramService]
    });
  });

  it('should ...', inject([OrganogramService], (service: OrganogramService) => {
    expect(service).toBeTruthy();
  }));
});
