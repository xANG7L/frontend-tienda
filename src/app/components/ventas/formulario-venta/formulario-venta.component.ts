import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Categoria } from '../../../models/categoria';
import { ProductoService } from '../../../services/producto.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FiltroProductosComponent } from './filtro-productos/filtro-productos.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { Venta } from '../../../models/venta';
import { DetalleVenta } from '../../../models/detalleVenta';
import { Producto } from '../../../models/producto';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';

@Component({
  selector: 'formulario-venta',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FiltroProductosComponent,
    ClienteFormComponent,
    DetalleVentaComponent
  ],
  templateUrl: './formulario-venta.component.html',
  styleUrl: './formulario-venta.component.css'
})

export class FormularioVentaComponent implements OnInit {

  errors: any = {};

  venta: Venta = new Venta();

  detalleVenta: DetalleVenta[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.venta.fechaVenta = new Date();
  }

  aniadirProducto(producto: Producto): void {
    const existeProducto = this.detalleVenta.find((detalle: DetalleVenta) =>
      detalle.producto.codigo === producto.codigo &&
      detalle.producto.categoria.id === producto.categoria.id);
    if (!existeProducto) {
      const detalle: DetalleVenta = new DetalleVenta();
      detalle.producto = producto;
      detalle.cantidad = 1;
      detalle.precioUnitario = parseFloat(producto.precio.toFixed(2));
      detalle.montoTotal = parseFloat((detalle.precioUnitario * detalle.cantidad).toFixed(2));
      this.detalleVenta = [...this.detalleVenta, { ...detalle }];
      this.calcularTotales();
    }
  }

  editarDetalleDeVenta(dvEmmitter: DetalleVenta): void {
    this.detalleVenta = [...this.detalleVenta.map(detalle => detalle.producto.codigo === dvEmmitter.producto.codigo ? { ...dvEmmitter } : detalle)];
    this.calcularTotales();
  }

  calcularTotales(): void {
    const totalSinIva = this.detalleVenta.reduce((total, dVenta) => total + (dVenta.cantidad * dVenta.precioUnitario), 0);
    const iva = totalSinIva * 0.13;
    const total = totalSinIva + iva;
    this.venta.subTotal = parseFloat(totalSinIva.toFixed(2));
    this.venta.iva = parseFloat(iva.toFixed(2));
    this.venta.total = parseFloat(total.toFixed(2));
  }

}
