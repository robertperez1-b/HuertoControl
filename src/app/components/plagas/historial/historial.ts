import { Component, OnInit } from '@angular/core';
import { PlagaService } from '../../services/plaga.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html'
})
export class HistorialComponent implements OnInit {
  plagas: any[] = [];
  loading = true;

  constructor(private plagaService: PlagaService) {}

  ngOnInit() {
    this.cargarPlagas();
  }

  cargarPlagas() {
    this.plagaService.obtenerPlagas().subscribe({
      next: (data) => {
        this.plagas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  eliminarPlaga(id: string) {
    if (confirm('¿Eliminar este registro?')) {
      this.plagaService.eliminarPlaga(id).subscribe(() => {
        this.cargarPlagas();
      });
    }
  }
}
