import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentePerfil } from './docente-perfil';

describe('DocentePerfil', () => {
  let component: DocentePerfil;
  let fixture: ComponentFixture<DocentePerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocentePerfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocentePerfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
