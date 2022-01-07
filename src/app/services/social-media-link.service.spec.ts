/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SocialMediaLinkService } from './social-media-link.service';

describe('Service: SocialMediaLink', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialMediaLinkService]
    });
  });

  it('should ...', inject([SocialMediaLinkService], (service: SocialMediaLinkService) => {
    expect(service).toBeTruthy();
  }));
});
