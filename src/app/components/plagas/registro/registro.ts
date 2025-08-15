import { Component } from '@angular/core';
import { PlagaService } from '../../services/plaga.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-plaga',
  templateUrl: './registro-plaga.component.html'
})
export class RegistroPlagaComponent {
  plagaForm = this.fb.group({
    nombre: ['', Validators.required],
    cultivo: ['', Validators.required],
    intensidad: [1, [Validators.min(1), Validators.max(5)]],
    imagen: [null],
    notas: ['']
  });

  constructor(
    private plagaService: PlagaService,
    private fb: FormBuilder
  ) {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.plagaForm.patchValue({
        imagen: event.target.files[0]
      });
    }
  }

  onSubmit() {
    const formData = new FormData();
    Object.keys(this.plagaForm.value).forEach(key => {
      formData.append(key, this.plagaForm.get(key)?.value);
    });

    this.plagaService.registrarPlaga(formData).subscribe({
      next: () => alert('Plaga registrada!'),
      error: err => alert('Error: ' + err.error.message)
    });
  }
}
