import { Cliente } from "./cliente";
import { DetalleVenta } from "./detalleVenta";

export class Venta {
    id: number = 0;
    correlativo: string = '';
    cliente: Cliente = new Cliente();
    listaProductos: DetalleVenta[] = [];
    fechaVenta: Date = new Date();
    subTotal: number = 0.0;
    iva: number = 0.0;
    total: number = 0.0;
}