import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: string = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) { }

  obtenerListadoDeCategoriasHttp(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.url}/categorias/listar`)
  }

  crearProductoHttp(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.url}/crear`, producto)
  }

  actualizarProductoHttp(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.url}/actualizar/${producto.codigo}`, producto)
  }

  buscarProductoPorCodigoHttp(codigo: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}/ver/${codigo}`)
  }

  obtenerListaDeProductosHttp(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/listar`);
  }

  obtenerListaDeProductosFiltradosHttp(codigo: number, filtro: string): Observable<Producto[]> {
    console.log('ejecutando consulta')
    return this.http.get<Producto[]>(`${this.url}/filtro/${codigo}/${filtro}`);
  }

}
