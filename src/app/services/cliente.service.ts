import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url: string = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  listarClientesHttp(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/listar`);
  }

  listarClientesPorNombreHttp(filtro: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/filtrar/nombre-completo/${filtro}`);
  }

  crearClienteHttp(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}/crear`, cliente);
  }

  actualizarClienteHttp(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}/actualizar/${cliente.codigo}`, cliente);
  }

  eliminarClienteHttp(codigo: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/eliminar/${codigo}`);
  }

  buscarClientePorCodigo(codigo: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/cliente/${codigo}`);
  }

  generarCorrelativoHttp(): Observable<any> {
    return this.http.get<any>(`${this.url}/generar-codigo`);
  }

}
