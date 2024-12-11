import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Empleado } from '../../../models/empleado';

@Component({
  selector: 'app-form-empleado',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-empleado.component.html',
  styleUrl: './form-empleado.component.css'
})
export class FormEmpleadoComponent {

  empleado: Empleado = new Empleado();

  onSubmit(empleadoForm: NgForm) {
    console.log(this.empleado);
  }
}
