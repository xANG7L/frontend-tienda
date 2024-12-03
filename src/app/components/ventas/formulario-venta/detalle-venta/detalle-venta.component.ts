import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DetalleVenta } from '../../../../models/detalleVenta';

@Component({
  selector: 'detalle-venta',
  standalone: true,
  imports: [],
  templateUrl: './detalle-venta.component.html',
  styleUrl: './detalle-venta.component.css'
})
export class DetalleVentaComponent {

  @Input() detalleVenta: DetalleVenta[] = [];

  @Output() actualizarDetalle: EventEmitter<DetalleVenta> = new EventEmitter();

  actualizarCantidadProducto(detalleVenta: DetalleVenta, event: any): void {
    let cantidad = event.target.value as number;
    detalleVenta.cantidad = cantidad;
    detalleVenta.montoTotal = cantidad * detalleVenta.precioUnitario;
    this.actualizarDetalle.emit(detalleVenta);
  }


}
