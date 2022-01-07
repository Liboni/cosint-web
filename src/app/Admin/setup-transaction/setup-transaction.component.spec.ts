import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupTransactionComponent } from './setup-transaction.component';

describe('SetupTransactionComponent', () => {
  let component: SetupTransactionComponent;
  let fixture: ComponentFixture<SetupTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
