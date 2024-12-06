import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from '../../../../models/cliente';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../../../services/cliente.service';
import { Observable, exhaustMap, map, of } from 'rxjs';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { Venta } from '../../../../models/venta';

@Component({
  selector: 'cliente-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    AsyncPipe
  ],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent implements OnInit {

  @Input() venta: Venta = new Venta();

  @Output() clienteEventEmmitter: EventEmitter<Cliente> = new EventEmitter();

  clientes: Cliente[] = [];

  clientesFiltrados!: Observable<Cliente[]>;

  filtroClientes = new FormControl('');

  //@Output() clienteEventEmitter: EventEmitter
  constructor(
    private service: ClienteService
  ) {
  }
  ngOnInit(): void {
    this.inicializarFiltros();
  }

  private _filter(value: string): Observable<Cliente[]> {
    let filterValue = typeof value === 'string' ? value.toLowerCase().trim() : '';

    if (filterValue != '') {
      return this.service.listarClientesPorNombreHttp(filterValue);
    }
    return of([]);
  }

  inicializarFiltros(): void {
    this.clientesFiltrados = this.filtroClientes.valueChanges
      .pipe(
        exhaustMap(value => this._filter(value || '')
          .pipe(
            map(clientes => clientes ? clientes : [])
          ))
      )
  }

  seleccionarCliente(event: MatAutocompleteSelectedEvent): void {
    let cliente = event.option.value as Cliente;

    if (cliente != undefined || cliente != null) {
      this.clienteEventEmmitter.emit(cliente);
    }

  };

  mostrarCliente(cliente?: Cliente): any {
    return cliente ? `${cliente.nombre} ${cliente.apellido}` : '';
  }

}
