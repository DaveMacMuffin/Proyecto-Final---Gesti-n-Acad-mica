import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesDireccion } from './reportes-direccion';

describe('ReportesDireccion', () => {
  let component: ReportesDireccion;
  let fixture: ComponentFixture<ReportesDireccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportesDireccion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesDireccion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
