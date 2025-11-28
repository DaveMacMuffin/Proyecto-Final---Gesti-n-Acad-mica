import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteNumeralia } from './docente-numeralia';

describe('DocenteNumeralia', () => {
  let component: DocenteNumeralia;
  let fixture: ComponentFixture<DocenteNumeralia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocenteNumeralia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocenteNumeralia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
