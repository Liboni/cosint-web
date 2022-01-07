import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupRateComponent } from './setup-rate.component';

describe('SetupRateComponent', () => {
  let component: SetupRateComponent;
  let fixture: ComponentFixture<SetupRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
