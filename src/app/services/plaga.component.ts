import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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
}
