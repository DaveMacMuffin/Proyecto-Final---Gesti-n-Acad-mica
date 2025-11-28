import { Component } from '@angular/core';
import { SqlService } from '../../srv/docentes.service';

@Component({
  selector: 'app-docente-numeralia',
  standalone: false,
  templateUrl: './docente-numeralia.html',
  styleUrls: ['./docente-numeralia.css']
})
export class DocenteNumeralia {
  totalDocentes = 0;
  activos = 0;
  inactivos = 0;
  sniActivos = 0;

  totalDoctorado = 0;
  porcentDoctor = 0;
  totalMaestría = 0;
  porcentajeMaest = 0;
  totalLicenciatura = 0;
  porcentajeLic = 0;

  totalNiveluno = 0;
  porcentNivelUno = 0;

  totalNiveldos = 0;
  porcentNivelDos = 0;

  totalNiveltres = 0;
  porcentNivelTres = 0;

  totalIngAvanz = 0;
  porcentIngAvanz = 0;

  totalIngInter = 0;
  porcentIngInter = 0;

  totalOtrosIdiomas = 0;
  porcentOtrosIdiomas = 0;

  porcentajeActivos = 0;
  porcentajeDoctoradoGeneral = 0;

  constructor(private sql: SqlService) { }

  async ngOnInit() {
    this.cargarCintaResumen();
    this.cargarGradoAcad();
    this.cargarsniDistribution();
    this.cargarIdiomaDistribution();
  }
  async cargarCintaResumen() {

    const datos: any = await this.sql.getResumenDocentes();
    const fila = datos[0];
    if (!fila) return;

    this.totalDocentes = Number(fila.total_docentes) || 0;
    this.activos = Number(fila.activos) || 0;
    this.inactivos = Number(fila.inactivos) || 0;
    this.sniActivos = Number(fila.sni_activos) || 0;

this.stats = [
  { label: 'Total Docentes', value: this.totalDocentes, icon: 'fa-solid fa-users', color: 'text-primary' },
  { label: 'Activos', value: this.activos, icon: 'fa-solid fa-check', color: '#2eb237' },
  { label: 'Inactivos', value: this.inactivos, icon: 'fa-solid fa-xmark', color: 'text-muted-foreground' },
  { label: 'SNI Activos', value: this.sniActivos, icon: 'fa-solid fa-award', color: 'text-accent' },
];

    this.actualizarResumenEjecutivo();
  }
  stats = [
    { label: 'Total Docentes', value: 0, icon: 'fa-solid fa-users', color: 'text-primary' },
    { label: 'Activos', value: 0, icon: 'fa-solid fa-check', color: '#2eb237' },
    { label: 'Inactivos', value: 0, icon: 'fa-solid fa-xmark', color: 'text-muted-foreground' },
    { label: 'SNI Activos', value: 0, icon: 'fa-solid fa-award', color: 'text-accent' },
  ];

  async cargarGradoAcad() {

    const dist: any = await this.sql.getDistDocentes();
    console.log("Distribución grados:", dist);

    const total1 =
      (dist.Doctorado || 0) +
      (dist['Maestría'] || 0) +
      (dist.Licenciatura || 0);

    this.totalDoctorado = dist.Doctorado || 0;
    this.totalMaestría = dist['Maestría'] || 0;
    this.totalLicenciatura = dist.Licenciatura || 0;

    this.porcentDoctor = Math.round((this.totalDoctorado / total1) * 100);
    this.porcentajeMaest = Math.round((this.totalMaestría / total1) * 100);
    this.porcentajeLic = Math.round((this.totalLicenciatura / total1) * 100);

    this.gradoDistribution = [
      { grado: 'Doctorado', count: this.totalDoctorado, percentage: this.porcentDoctor },
      { grado: 'Maestría', count: this.totalMaestría, percentage: this.porcentajeMaest },
      { grado: 'Licenciatura', count: this.totalLicenciatura, percentage: this.porcentajeLic },
    ];
    this.actualizarResumenEjecutivo();
  }
  gradoDistribution = [
    { grado: 'Doctorado', count: 0, percentage: 0 },
    { grado: 'Maestría', count: 0, percentage: 0 },
    { grado: 'Licenciatura', count: 0, percentage: 0 },
  ];




  async cargarsniDistribution() {

    const sni: any = await this.sql.getsniDistribution();
    console.log("Distribución sni:", sni);

    const total2 =
      (sni['Nivel I'] || 0) +
      (sni['Nivel II'] || 0) +
      (sni['Nivel III'] || 0);

    this.totalNiveluno = sni['Nivel I'] || 0;
    this.totalNiveldos = sni['Nivel II'] || 0;
    this.totalNiveltres = sni['Nivel III'] || 0;

    this.porcentNivelUno = Math.round((this.totalNiveluno / total2) * 100);
    this.porcentNivelDos = Math.round((this.totalNiveldos / total2) * 100);
    this.porcentNivelTres = Math.round((this.totalNiveltres / total2) * 100);

    this.sniDistribution = [
      { nivel: 'Nivel III', count: this.totalNiveltres, percentage: this.porcentNivelTres },
      { nivel: 'Nivel II', count: this.totalNiveldos, percentage: this.porcentNivelDos },
      { nivel: 'Nivel I', count: this.totalNiveluno, percentage: this.porcentNivelUno },
    ];
  }
  sniDistribution = [
    { nivel: 'Nivel III', count: 0, percentage: 0 },
    { nivel: 'Nivel II', count: 0, percentage: 0 },
    { nivel: 'Nivel I', count: 0, percentage: 0 },
    { nivel: 'Candidato', count: 0, percentage: 0 },
  ];


async cargarIdiomaDistribution() {
  const idioma: any = await this.sql.getIdiomaDistribution();
  console.log('Distribución idiomas:', idioma);

  const total3 =
    Number(idioma.ingles_avanzado   || 0) +
    Number(idioma.ingles_intermedio || 0) +
    Number(idioma.otros_idiomas     || 0);

  this.totalIngAvanz       = idioma.ingles_avanzado   || 0;
  this.totalIngInter       = idioma.ingles_intermedio || 0;
  this.totalOtrosIdiomas   = idioma.otros_idiomas     || 0;

  this.porcentIngAvanz     = Math.round(this.totalIngAvanz/ total3 * 100);
  this.porcentIngInter     = Math.round(this.totalIngInter / total3 * 100);
  this.porcentOtrosIdiomas = Math.round(this.totalOtrosIdiomas / total3 * 100);

  this.idiomaDistribution = [
    { idioma: 'Inglés Avanzado',   count: this.totalIngAvanz, percentage: this.porcentIngAvanz },
    { idioma: 'Inglés Intermedio', count: this.totalIngInter, percentage: this.porcentIngInter },
    { idioma: 'Otros idiomas',     count: this.totalOtrosIdiomas, percentage: this.porcentOtrosIdiomas },
  ];
}
  idiomaDistribution = [
    { idioma: 'Inglés Avanzado', count: 0, percentage: 0 },
    { idioma: 'Inglés Intermedio', count: 0, percentage: 0 },
    { idioma: 'Otros idiomas', count: 0, percentage: 0 },
  ];
  
  actualizarResumenEjecutivo() {

    this.porcentajeActivos = Math.round((this.activos / this.totalDocentes) * 100);
    this.porcentajeDoctoradoGeneral = Math.round((this.totalDoctorado / this.totalDocentes) * 100);

    this.resumenEjecutivo = [
      {
        texto: `${this.porcentajeActivos}% de la planta docente está activa`,
        color: 'text-green-600'
      },
      {
        texto: `${this.porcentajeDoctoradoGeneral}% cuenta con grado de doctorado`,
        color: 'text-blue-600'
      },
      {
        texto: `${this.sniActivos} investigadores en SNI activos`,
        color: 'text-amber-600'
      },
    ];
  }
  resumenEjecutivo = [
    { texto: '', color: 'text-muted-foreground' },
  ];
}
