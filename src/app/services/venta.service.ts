import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private url: string = 'http://localhost:8080/api/ventas'

  //private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient
  ) { }


  generarCorrelativo(): Observable<any> {
    return this.http.get<any>(`${this.url}/generar-correlativo`);
  }

  facturarVenta(venta: Venta): Observable<any> {
    return this.http.post<any>(`${this.url}/facturar`, venta)
  }

  obtenerDatos(): Observable<any> {
    return this.http.get<any>(`${this.url}/datos`);
  }

  anularVenta(codigoVenta: number): Observable<any> {
    return this.http.put<any>(`${this.url}/anular/${codigoVenta}`, null);
  }

  descargarFactura(codigoVenta: number): Observable<HttpResponse<Blob>>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.url}/descargar-factura/${codigoVenta}`, {
      headers,
      responseType: 'blob',
      observe: 'response'
    })
  }


  // imprimirPdfDeComprobante(idOrden: number): Observable<HttpResponse<Blob>> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.get(`${this.url}/generar-comprobante/${idOrden}`, {
  //     headers,
  //     responseType: 'blob',
  //     observe: 'response'
  //   })
  // }
}
