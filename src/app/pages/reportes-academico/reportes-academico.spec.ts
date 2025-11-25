import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesAcademico } from './reportes-academico';

describe('ReportesAcademico', () => {
  let component: ReportesAcademico;
  let fixture: ComponentFixture<ReportesAcademico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportesAcademico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesAcademico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
