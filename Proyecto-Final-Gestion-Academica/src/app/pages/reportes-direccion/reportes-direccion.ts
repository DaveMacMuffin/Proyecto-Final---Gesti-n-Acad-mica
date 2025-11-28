import { Component, OnInit } from '@angular/core';
import { SqlService } from '../../srv/docentes.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-reportes-direccion',
  standalone: false,
  templateUrl: './reportes-direccion.html',
  styleUrls: ['./reportes-direccion.css']
})
export class ReportesDireccion implements OnInit {
  
  kpis: any[] = [];
  kpisTipos: any[] = []; 

  listaTickets: any[] = []; 
  
  filtroActual: string = 'todo';

  constructor(private sqlService: SqlService) {}

  ngOnInit() {
    this.cargarDatos('todo');
  }

  async cargarDatos(filtro: string) {
    try {
      this.filtroActual = filtro;
      console.log("Cargando datos con filtro:", filtro);

      const data: any = await this.sqlService.getKpisDireccion(filtro);
      
      // fila de arriba
      this.kpis = [
        { titulo: 'Reportes Abiertos', valor: data.reportes.abiertos, tendencia: `${data.reportes.cerrados} Cerrados`, icon: '⚠️'},
        { titulo: 'Prof. con Reportes', valor: data.reportes.docentes_afectados, tendencia: 'Incidentes', icon: '🔔'},
        { titulo: 'Docentes con Maestría', valor: data.academia.maestrias, tendencia: `${data.academia.clases_promedio} Clases x Prof`, icon: '🎓'},
        { titulo: 'Investigadores SNI', valor: data.academia.sni, tendencia: 'Miembros activos', icon: '🏆'},
      ];

      // Tipos
      if (data.tipos_detalle) {
        this.kpisTipos = data.tipos_detalle.map((t: any) => ({
            titulo: t.tipo,
            total: t.total,
            resueltos: t.resueltos,
            proceso: t.proceso,
            pendientes: t.pendientes,
            icon: this.getIconoPorTipo(t.tipo)
        }));
      } else {
        this.kpisTipos = [];
      }

      // tabla
      if (data.lista_tickets) {
        this.listaTickets = data.lista_tickets;
      } else {
        this.listaTickets = [];
      }

    } catch (error) {
      console.error("Error cargando dirección:", error);
    }
  }

  cambiarFiltro(evento: any) {
    const nuevoFiltro = evento.target.value;
    this.cargarDatos(nuevoFiltro); // Recarga todo desde la BD
  }

  getIconoPorTipo(tipo: string): string {
    const t = tipo.toLowerCase();
    if (t.includes('pago')) return '💰';
    if (t.includes('calificación') || t.includes('nota')) return '📝';
    if (t.includes('disciplinar') || t.includes('conducta')) return '⚖️';
    if (t.includes('examen') || t.includes('fecha')) return '📅';
    return '📌';
  }
exportarPDF() {
    const doc = new jsPDF();
    const fecha = new Date().toLocaleDateString();

    doc.setFontSize(18);
    doc.text('Reporte Integral de Dirección', 14, 20);
    
    doc.setFontSize(10);
    doc.text(`Fecha de generación: ${fecha}`, 14, 28);
    doc.text(`Filtro aplicado: ${this.filtroActual.toUpperCase()}`, 14, 33);
    doc.line(14, 35, 196, 35);

    doc.setFontSize(14);
    doc.text('1. Resumen Ejecutivo', 14, 45);

    const dataKPIs = this.kpis.map(k => [k.titulo, k.valor, k.tendencia]);
    
    autoTable(doc, {
      startY: 50,
      head: [['Indicador', 'Valor Actual', 'Nota / Tendencia']],
      body: dataKPIs,
      theme: 'striped', 
      headStyles: { fillColor: [66,66,66] },
      styles: { fontSize: 10 }
    });

    let finalY = (doc as any).lastAutoTable.finalY || 50;
    
    doc.setFontSize(14);
    doc.text('2. Desglose por Categoría', 14, finalY + 15);

    const dataTipos = this.kpisTipos.map(t => [
      t.titulo, 
      t.total, 
      t.pendientes, 
      t.proceso, 
      t.resueltos
    ]);

    autoTable(doc, {
      startY: finalY + 20,
      head: [['Categoría', 'Total Tickets', 'Pendientes', 'En Proceso', 'Resueltos']],
      body: dataTipos,
      theme: 'striped',
      headStyles: { fillColor: [66,66,66] }
    });

    finalY = (doc as any).lastAutoTable.finalY;
    
    if (finalY > 220) { doc.addPage(); finalY = 20; } else { finalY += 15; }

    doc.setFontSize(14);
    doc.text('3. Detalle Operativo de Tickets', 14, finalY);

    const dataTickets = this.listaTickets.map(t => [
      t.tipo,
      t.descripcion,
      t.prioridad,
      t.estado,
      t.fecha_creacion
    ]);

    autoTable(doc, {
      startY: finalY + 5,
      head: [['Tipo', 'Descripción', 'Prioridad', 'Estado', 'Fecha']],
      body: dataTickets,
      theme: 'grid',
      headStyles: { fillColor: [66,66,66] },
      styles: { fontSize: 8 },
      columnStyles: { 1: { cellWidth: 60 } } 
    });

    doc.save(`Reporte_Direccion_Completo_${this.filtroActual}.pdf`);
  }

 exportarXLSX() {
   // se supone que esto hace que no pete excel con acentos pero en practica ¯\_(ツ)_/¯ 50-50
    let csv = "\uFEFF"; 
    csv += `REPORTE INTEGRAL DE DIRECCION\n`;
    csv += `Filtro: ${this.filtroActual.toUpperCase()}\n`;
    csv += `Fecha: ${new Date().toLocaleDateString()}\n\n`;

    csv += "--- 1. RESUMEN EJECUTIVO ---\n";
    csv += "Indicador,Valor,Nota\n";
    this.kpis.forEach(k => {
      csv += `"${k.titulo}","${k.valor}","${k.tendencia}"\n`;
    });
    csv += "\n";

    csv += "--- 2. DESGLOSE POR CATEGORIA ---\n";
    csv += "Categoria,Total,Pendientes,En Proceso,Resueltos\n";
    this.kpisTipos.forEach(t => {
      csv += `"${t.titulo}",${t.total},${t.pendientes},${t.proceso},${t.resueltos}\n`;
    });
    csv += "\n";

    csv += "--- 3. DETALLE DE TICKETS ---\n";
    csv += "Tipo,Descripcion,Prioridad,Estado,Fecha\n";
    
    if (this.listaTickets.length > 0) {
      this.listaTickets.forEach(t => {
        // Limpiamos la descripcion (gracias pln)
        const desc = t.descripcion ? t.descripcion.replace(/(\r\n|\n|\r)/gm, " ") : "";
        csv += `"${t.tipo}","${desc}","${t.prioridad}","${t.estado}","${t.fecha_creacion}"\n`;
      });
    } else {
      csv += "No hay tickets en este periodo.,,,,\n";
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Reporte_Direccion_${this.filtroActual}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}