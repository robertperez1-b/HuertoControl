import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlagaService } from '../../services/plagas.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
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
