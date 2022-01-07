/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductCategoriesService } from './product-categories.service';

describe('Service: ProductCategories', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductCategoriesService]
    });
  });

  it('should ...', inject([ProductCategoriesService], (service: ProductCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
