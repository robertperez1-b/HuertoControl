import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlagaService } from '../../../services/plagas.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html'
})
export class RegistroComponent {
  plagaForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private plagaService: PlagaService) {
    this.plagaForm = this.fb.group({
      nombre: ['', Validators.required],
      cultivo: ['', Validators.required],
      intensidad: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      notas: ['']
    });
  }

  updateIntensityImage() {
    // Aquí podrías cambiar una imagen en función de la intensidad seleccionada
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.plagaForm.valid) {
      const formData = new FormData();
      formData.append('nombre', this.plagaForm.get('nombre')?.value);
      formData.append('cultivo', this.plagaForm.get('cultivo')?.value);
      formData.append('intensidad', this.plagaForm.get('intensidad')?.value);
      formData.append('notas', this.plagaForm.get('notas')?.value);
      if (this.selectedFile) {
        formData.append('imagen', this.selectedFile);
      }

      this.plagaService.registrarPlaga(formData).subscribe({
        next: () => {
          alert('Plaga registrada con éxito');
          this.plagaForm.reset({ intensidad: 1 });
          this.selectedFile = null;
        },
        error: (err) => {
          console.error('Error al registrar plaga', err);
          alert('Error al registrar la plaga');
        }
      });
    }
  }
}
