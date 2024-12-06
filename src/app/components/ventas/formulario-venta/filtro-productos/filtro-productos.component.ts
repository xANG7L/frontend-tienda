import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Producto } from '../../../../models/producto';
import { Categoria } from '../../../../models/categoria';
import { ProductoService } from '../../../../services/producto.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EMPTY, Observable, exhaustMap, flatMap, map, of, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Cliente } from '../../../../models/cliente';
//import { FormsModule } from '@angular/forms';

@Component({
  selector: 'filtro-productos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    AsyncPipe
  ],
  templateUrl: './filtro-productos.component.html',
  styleUrl: './filtro-productos.component.css'
})
export class FiltroProductosComponent implements OnInit {

  @Output() productoEventEmitter: EventEmitter<Producto> = new EventEmitter();

  categorias: Categoria[] = [];

  categoria: Categoria = new Categoria();

  productosFiltrados!: Observable<Producto[]>;

  productoFiltro = new FormControl(
    { value: '', disabled: this.categoria.id === 0 }
  );

  constructor(
    private service: ProductoService
  ) { }

  ngOnInit(): void {
    this.listarCategorias();
    this.inicializarFiltros();
  }

  mostrarProducto(producto?: Producto): any {
    return producto ? producto.codigo + ' - ' + producto.nombre : undefined;
  }

  inicializarFiltros(): void {
    this.productosFiltrados = this.productoFiltro.valueChanges
      .pipe(
        exhaustMap(value => this._filter(value || '')
          .pipe(
            map(productos => productos ? productos : [])
          )
        ),
      );
  }

  private _filter(value: string): Observable<Producto[]> {
    let filterValue = typeof value === 'string' ? value.toLowerCase() : '';
    if (this.categoria.id > 0 && filterValue != '') {
      return this.service.obtenerListaDeProductosFiltradosHttp(this.categoria.id, value);
    }
    return of([]);
  }

  listarCategorias(): void {
    this.service.obtenerListadoDeCategoriasHttp().subscribe({
      next: categorias => this.categorias = categorias,
      error: err => alert('error: ' + err.error)
    })
  }

  seleccionarCategoriaEvt(event: any): void {
    const id = event.target.value as number;
    if (id > 0) {
      this.categoria = this.categorias.find(c => c.id == id) || new Categoria();
      this.productoFiltro.enable();
    } else {
      this.categoria = new Categoria();
      this.productoFiltro.disable();
    }
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;

    if (producto != undefined || producto != null) {
      this.productoEventEmitter.emit(producto);
    }

    this.productoFiltro.setValue('');
    event.option.focus();
    event.option.deselect();
    // console.log(this.productos);
  };

  

}
