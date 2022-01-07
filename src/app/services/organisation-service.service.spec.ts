/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrganisationServiceService } from './organisation-service.service';

describe('Service: OrganisationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganisationServiceService]
    });
  });

  it('should ...', inject([OrganisationServiceService], (service: OrganisationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
