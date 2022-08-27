import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPaymentHistoryComponent } from './my-payment-history.component';

describe('MyPaymentHistoryComponent', () => {
  let component: MyPaymentHistoryComponent;
  let fixture: ComponentFixture<MyPaymentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPaymentHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
