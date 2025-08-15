import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlagaService } from '../../../services/plagas.service'; 


@Component({
  selector: 'app-historial',
  imports: [CommonModule],
  templateUrl: './historial.html'
})
export class HistorialComponent implements OnInit {
  plagas: any[] = [];
  loading = false;

  constructor(private plagaService: PlagaService) {} // 👈 ahora sí debería compilar

  ngOnInit() {
    this.cargarPlagas();
  }

  cargarPlagas() {
    this.loading = true;
    this.plagaService.obtenerPlagas().subscribe({
      next: (data) => {
        this.plagas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar plagas', err);
        this.loading = false;
      }
    });
  }

  eliminarPlaga(id: string) {
    if (confirm('¿Seguro que deseas eliminar esta plaga?')) {
      this.plagaService.eliminarPlaga(id).subscribe({
        next: () => this.cargarPlagas(),
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }
}
