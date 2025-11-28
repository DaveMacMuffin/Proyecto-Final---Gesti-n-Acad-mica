// ====================================================
// ARCHIVO: footer.ts
// DESCRIPCIÓN: Componente TypeScript del Footer
// FUNCIONALIDAD: 
//   - Provee el año actual dinámicamente
//   - Maneja estados hover para enlaces (opcional)
// NOTAS:
//   - currentYear se actualiza automáticamente cada año
//   - hoveredLink permite futuras mejoras de interactividad
// ====================================================

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  currentYear = new Date().getFullYear();
  hoveredLink: string | null = null;
}
