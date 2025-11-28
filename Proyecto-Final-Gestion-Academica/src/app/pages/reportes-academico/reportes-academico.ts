import { Component, OnInit } from '@angular/core';
import { SqlService } from '../../srv/docentes.service'; 

// IMPORTACIONES IMPORTANTES NO QUITAR
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-reportes-academico',
  standalone: false,
  templateUrl: './reportes-academico.html',
  styleUrls: ['./reportes-academico.css']
})
export class ReportesAcademico implements OnInit {

  reportesPorMateria: any[] = [];
  docentesSNI: any[] = [];
  evaluacionDocente: any[] = [];

  constructor(private sqlService: SqlService) {}

  ngOnInit() {
    this.cargarDashboard();
  }

  async cargarDashboard() {
    try {
      console.log("Iniciando carga de datos...");

      const datosMaterias = await this.sqlService.getRendimientoMaterias();
      if (Array.isArray(datosMaterias)) {
        this.reportesPorMateria = datosMaterias;
      }

      const datosSNI = await this.sqlService.getListadoSNI();
      if (Array.isArray(datosSNI)) {
        this.docentesSNI = datosSNI;
      }

      const datosEvaluacion = await this.sqlService.getEvaluacionDocente();
      if (Array.isArray(datosEvaluacion)) {
        this.evaluacionDocente = datosEvaluacion;
      }

    } catch (error) {
      console.error("Error cargando datos del dashboard:", error);
    }
  }

  exportarPDF() {
    const doc = new jsPDF();
    const fecha = new Date().toLocaleDateString();

    doc.setFontSize(18);
    doc.text('Reporte Académico Completo', 14, 20);
    doc.setFontSize(10);
    doc.text(`Generado el: ${fecha}`, 14, 28);
    doc.line(14, 30, 196, 30);

    doc.setFontSize(14);
    doc.text('1. Rendimiento por Materia', 14, 40);

    const dataMaterias = this.reportesPorMateria.map(m => [
      m.materia,
      m.promedio,
      m.aprobados + '%',
      m.reprobados + '%'
    ]);

    autoTable(doc, {
      startY: 45,
      head: [['Materia', 'Promedio', 'Aprobados', 'Reprobados']],
      body: dataMaterias,
      theme: 'grid',
      headStyles: { fillColor: [66, 66, 66] }
    });

    let finalY = (doc as any).lastAutoTable.finalY || 45;
    
    // añade nuevas paginas :o
    if (finalY > 240) { doc.addPage(); finalY = 20; } else { finalY += 15; }

    doc.setFontSize(14);
    doc.text('2. Investigadores SNI', 14, finalY);

    const dataSNI = this.docentesSNI.map(d => [
      d.nombre,
      d.nivel,
      d.publicaciones
    ]);

    autoTable(doc, {
      startY: finalY + 5,
      head: [['Docente', 'Nivel SNI', 'Publicaciones']],
      body: dataSNI,
      theme: 'grid',
      headStyles: { fillColor: [66, 66, 66] }
    });

    finalY = (doc as any).lastAutoTable.finalY;
    if (finalY > 240) { doc.addPage(); finalY = 20; } else { finalY += 15; }

    doc.setFontSize(14);
    doc.text('3. Ranking de Evaluación Docente', 14, finalY);

    const dataRanking = this.evaluacionDocente.map((d, index) => [
      index + 1,
      d.nombre,
      d.calificacion + '%'
    ]);

    autoTable(doc, {
      startY: finalY + 5,
      head: [['#', 'Profesor', 'Satisfacción']],
      body: dataRanking,
      theme: 'striped',
      headStyles: { fillColor: [66, 66, 66] }
    });

    doc.save(`Reporte_Completo_${new Date().toISOString().slice(0,10)}.pdf`);
  }

  exportarCSV() {
    if (!this.reportesPorMateria || this.reportesPorMateria.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    // se supone que esto hace que no pete excel con acentos pero en practica ¯\_(ツ)_/¯ 50-50
    csvContent += "\uFEFF"; 

    csvContent += "REPORTE DE RENDIMIENTO POR MATERIA\n";
    csvContent += "Materia,Promedio,Aprobados (%),Reprobados (%)\n";
    this.reportesPorMateria.forEach(row => {
      csvContent += `"${row.materia}",${row.promedio},${row.aprobados},${row.reprobados}\n`;
    });

    
    // espacio :D
    csvContent += "\n\n";

  
    csvContent += "LISTADO DE INVESTIGADORES SNI\n";
    csvContent += "Nombre Docente,Nivel SNI,Publicaciones\n";
    this.docentesSNI.forEach(row => {
      csvContent += `"${row.nombre}",${row.nivel},${row.publicaciones}\n`;
    });

    // espacio :D
    csvContent += "\n\n";

    csvContent += "RANKING DE EVALUACION DOCENTE\n";
    csvContent += "Posicion,Nombre Docente,Calificacion (%)\n";
    this.evaluacionDocente.forEach((row, index) => {
      csvContent += `${index + 1},"${row.nombre}",${row.calificacion}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reporte_academico_completo.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}