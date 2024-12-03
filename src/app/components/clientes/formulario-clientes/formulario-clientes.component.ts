import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { EMPTY, catchError, of } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'formulario-clientes',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgxMaskDirective
  ],
  templateUrl: './formulario-clientes.component.html',
  styleUrl: './formulario-clientes.component.css'
})
export class FormularioClientesComponent implements OnInit {

  errors: any = {};

  cliente: Cliente = new Cliente();

  actualizar: boolean = false;

  constructor(private service: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const codigo: string = (params.get('codigo') || '');
      if (codigo != '') {
        this.actualizar = true;
        this.buscarClienteParaActualizarEvt(codigo);
      } else {
        this.generarCorrelativoEvt();
      }
    }
    )

  }

  onSubmit(clientForm: NgForm) {
    if (this.actualizar) {
      this.service.actualizarClienteHttp(this.cliente).pipe(
        catchError(err => {
          alert('Error al actualizar el cliente');
          console.log(err);
          return EMPTY;
        })
      ).subscribe(cliente => {
        if (cliente) {
          Swal.fire({
            title: "Cliente actualizado!",
            text: `Los datos del cliente ${cliente.nombre} han sido actualizados correctamente!`,
            icon: "success"
          });
          clientForm.resetForm();
          this.router.navigate(['clientes/listar']);
        }
      })
    } else {
      this.service.crearClienteHttp(this.cliente).pipe(
        catchError(err => {
          this.errors = err.error; // Manejar errores aquí
          console.error('Error al registrar el cliente:', err);
          // // Mostrar mensaje de error con Swal
          // Swal.fire({
          //   title: "Error!",
          //   text: `No se pudo registrar al cliente: ${err.error.message || 'Error desconocido'}`,
          //   icon: "error"
          // });
          // // Detener el flujo retornando un observable vacío
          return of(null);
        })
      ).subscribe(cliente => {
        if (cliente) {
          Swal.fire({
            title: "Registro agregado!",
            text: `El cliente ${cliente.nombre} ha sido registrado correctamente!`,
            icon: "success"
          });
          clientForm.resetForm();
          this.router.navigate(['clientes/listar']);
        }
      });
    }
  }

  limpiarForm(clientForm: NgForm): void {
    clientForm.resetForm();
    this.cliente = new Cliente();
    if (this.actualizar) {
      this.router.navigate(['clientes/crear'])
    }
  }

  generarCorrelativoEvt(): void {
    this.service.generarCorrelativoHttp().pipe(
      catchError(() => EMPTY)
    ).subscribe(response => this.cliente.codigo = response.codigo);
  }

  buscarClienteParaActualizarEvt(codigo: string): void {
    this.service.buscarClientePorCodigo(codigo).pipe(
      catchError((err) => {
        console.log(err);
        return EMPTY;
      })
    ).subscribe(res => this.cliente = res as Cliente);
  }


}
