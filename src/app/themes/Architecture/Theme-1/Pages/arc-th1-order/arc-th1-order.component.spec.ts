/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ArcTh1OrderComponent } from './arc-th1-order.component';

describe('ArcTh1OrderComponent', () => {
  let component: ArcTh1OrderComponent;
  let fixture: ComponentFixture<ArcTh1OrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcTh1OrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcTh1OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
