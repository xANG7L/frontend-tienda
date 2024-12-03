import { Producto } from "./producto";

export class DetalleVenta {
    id: number = 0;
    producto: Producto = new Producto();
    precioUnitario: number = 0.0;
    cantidad: number = 0.0;
    montoTotal: number = 0.0;
}