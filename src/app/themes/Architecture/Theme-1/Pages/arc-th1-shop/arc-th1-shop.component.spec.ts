/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ArcTh1ShopComponent } from './arc-th1-shop.component';

describe('ArcTh1ShopComponent', () => {
  let component: ArcTh1ShopComponent;
  let fixture: ComponentFixture<ArcTh1ShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcTh1ShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcTh1ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
