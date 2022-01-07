/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SetupShopComponent } from './setup-shop.component';

describe('SetupShopComponent', () => {
  let component: SetupShopComponent;
  let fixture: ComponentFixture<SetupShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
