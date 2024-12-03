import { Categoria } from "./categoria";

export class Producto {
    codigo: string = '';
    nombre: string = '';
    precio: number = 0.0;
    categoria!: Categoria;
}