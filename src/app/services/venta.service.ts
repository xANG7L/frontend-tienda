import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private url: string = 'http://localhost:8080/api/ventas'

  constructor(
    private http: HttpClient
  ) { }


    generarCorrelativo(): Observable<any>{
      return this.http.get<any>(`${this.url}/generar-correlativo`);
    }

}
