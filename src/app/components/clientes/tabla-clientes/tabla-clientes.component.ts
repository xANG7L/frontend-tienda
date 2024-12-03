import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { catchError, of } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { IBusquedaParam } from '../../../interfaces/IBusquedaParam';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabla-clientes',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './tabla-clientes.component.html',
  styleUrl: './tabla-clientes.component.css'
})
export class TablaClientesComponent implements OnInit {

  parametros: IBusquedaParam[] = [];

  parametro!: IBusquedaParam;

  clientes: Cliente[] = [];

  actualizando: boolean = false;

  constructor(private clienteService: ClienteService, private route: Router) {
    this.parametros = [
      {
        id: 1,
        param: 'Dui del cliente'
      },
      {
        id: 2,
        param: 'Nombre del cliente'
      }
    ]
  }

  ngOnInit(): void {
    this.listarClientesEvt();
  }

  listarClientesEvt(): void {
    this.clienteService.listarClientesHttp().subscribe({
      next: clientes => {
        this.clientes = clientes
      },
      error: err => {
        console.log(err)
        console.log('Error al obtener los clientes');
        return of([]);
      }
    })
  }

  eliminarClienteEvt(codigo: string): void {
    Swal.fire({
      title: "¿Desea eliminar el cliente de nuestro sistema?",
      showConfirmButton: true,
      showCancelButton: true,
      icon: "warning",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.eliminarClienteHttp(codigo).pipe(
          catchError((error: any) => {
            console.log('Error al obtener los clientes');
            Swal.fire({
              title: 'Error al eliminar el cliente',
              text: error.errors.mensaje,
              icon: 'success'
            })
            return of([]);
          })
        ).subscribe((res) => {
          Swal.fire({
            title: 'Cliente eliminado',
            text: res.mensaje,
            icon: 'success'
          }
          )
          this.clientes = this.clientes.filter(cliente => cliente.codigo != codigo);
        })
      }
    });


  }

  actualizarClienteEvt(codigo: string) {
    this.route.navigate(['clientes/actualizar/' + codigo])
  }

  filtrarClientes(event: Event): void {
    const inputEvent = event.target as HTMLInputElement;
    const filtro = inputEvent.value as string;

    if (filtro.length > 0) {
      this.clienteService.listarClientesPorNombreHttp(filtro).subscribe({
        next: clientes => this.clientes = clientes
      })
    } else {
      this.listarClientesEvt();
    }
  }

  seleccionarParametroEvt(event: any): void { 
    const parametro = event.target.value as IBusquedaParam;
    console.log(parametro)
  }

}
