import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  plagaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.plagaForm = this.fb.group({
      nombre: ['', Validators.required],
      cultivo: ['tomate', Validators.required],
      intensidad: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      imagen: [null]
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.plagaForm.patchValue({ imagen: input.files[0] });
    }
  }

  onSubmit() {
    if (this.plagaForm.valid) {
      console.log('Datos de plaga:', this.plagaForm.value);
      // Aquí iría la llamada al servicio que guarda la plaga en tu backend
    } else {
      console.log('Formulario inválido');
    }
  }
}
