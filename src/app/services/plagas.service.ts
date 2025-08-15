import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PlagaService {
  private apiUrl = `${environment.apiUrl}/plagas`;

  constructor(private http: HttpClient) {}

  registrarPlaga(formData: FormData) {
    return this.http.post(`${this.apiUrl}`, formData);
  }

  obtenerPlagas() {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  eliminarPlaga(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  //  Nuevo método para Dashboard (versión con cálculo en cliente)
  obtenerEstadisticas() {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      map(plagas => ({
        totalPlagas: plagas.length,
        plagasActivas: plagas.filter(p => p.activa).length,
        cultivoMasAfectado: this.cultivoMasAfectado(plagas)
      }))
    );
  }

  private cultivoMasAfectado(plagas: any[]): string {
    const conteo: Record<string, number> = {};
    plagas.forEach(p => {
      conteo[p.cultivo] = (conteo[p.cultivo] || 0) + 1;
    });
    return Object.entries(conteo).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
  }
}
