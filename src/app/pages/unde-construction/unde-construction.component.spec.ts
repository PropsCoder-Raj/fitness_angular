import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndeConstructionComponent } from './unde-construction.component';

describe('UndeConstructionComponent', () => {
  let component: UndeConstructionComponent;
  let fixture: ComponentFixture<UndeConstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UndeConstructionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndeConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
