import { Component, OnInit } from '@angular/core';
import { SqlService } from '../../srv/docentes.service';

@Component({
  selector: 'app-docente-perfil',
  standalone: false,
  templateUrl: './docente-perfil.html',
  styleUrls: ['./docente-perfil.css']
})
export class DocentePerfil implements OnInit {
  
  docenteId = 0; 
  perfil: any = null;
  
  
  listaDocentes: any[] = [];

  tabs = [
    { id: 'cv', label: 'Curriculum Vitae' },
    { id: 'clases', label: 'Historial de Clases' },
    { id: 'evaluacion', label: 'Evaluación Docente' },
    { id: 'incidencias', label: 'Incidencias' }
  ];

  activeTab = 'cv';

  constructor(private sqlService: SqlService) {}

  ngOnInit() {
    this.cargarListaDocentes(); 
    //this.cargarPerfil();        
  }

  async cargarListaDocentes() {
    try {
      const data: any = await this.sqlService.getListaDocentes();
      if (Array.isArray(data)) {
        this.listaDocentes = data;
      }
    } catch (error) {
      console.error("Error cargando lista de docentes", error);
    }
  }

  async cargarPerfil() {
    if (this.docenteId == 0) return; 

    try {
      this.perfil = null;
      this.perfil = await this.sqlService.getPerfilDocente(this.docenteId);
    } catch (error) {
      console.error("Error cargando perfil:", error);
    }
  }

  // dropdown change = cambio de perfil
  cambiarDocente(event: any) {
    this.docenteId = event.target.value;
    this.cargarPerfil();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}