import { Component, OnInit } from '@angular/core';
import { PlagaService } from '../../services/plaga.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  stats = {
    totalPlagas: 0,
    plagasActivas: 0,
    cultivoMasAfectado: ''
  };

  constructor(private plagaService: PlagaService) {}

  ngOnInit() {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.plagaService.obtenerEstadisticas().subscribe({
      next: (data) => this.stats = data,
      error: (err) => console.error(err)
    });
  }
}
