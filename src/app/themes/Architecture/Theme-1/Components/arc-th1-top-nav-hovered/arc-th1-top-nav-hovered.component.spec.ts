/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ArcTh1TopNavHoveredComponent } from './arc-th1-top-nav-hovered.component';

describe('ArcTh1TopNavHoveredComponent', () => {
  let component: ArcTh1TopNavHoveredComponent;
  let fixture: ComponentFixture<ArcTh1TopNavHoveredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcTh1TopNavHoveredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcTh1TopNavHoveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
