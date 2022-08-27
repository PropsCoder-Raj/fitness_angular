import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySessionComponent } from './my-session.component';

describe('MySessionComponent', () => {
  let component: MySessionComponent;
  let fixture: ComponentFixture<MySessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
