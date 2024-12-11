import { Component, OnInit } from '@angular/core';
import { Venta } from '../../models/venta';
import { VentaService } from '../../services/venta.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  cantidadProductos: number = 0;

  cantidadVentas: number = 0;

  cantidadClientes: number = 0;

  ventas: Venta[] = [];

  constructor(private service:VentaService){}

  ngOnInit(): void {
    this.service.obtenerDatos().subscribe({
      next: json => {
        this.cantidadClientes = json.cantidadClientes as number;
        this.cantidadVentas = json.cantidadVentas as number;
        this.cantidadProductos = json.cantidadProductos as number;
        this.ventas = json.ventas as Venta[];
      }
    });
  }

  fechaFormateada(date: any): string {
    return formatDate(date, 'dd/MM/yyyy','en');
  }

  anularVentaEvt(codigoVenta: number): void {
    Swal.fire({
      title: "¿Desea eliminar esta venta de nuestro sistema?",
      showConfirmButton: true,
      showCancelButton: true,
      icon: "warning",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.anularVenta(codigoVenta).subscribe({
          next: res => {
            Swal.fire({
              title: 'Operacion realizada!',
              text: res.mensaje,
              icon: 'success'
            }).then(() => {
              window.location.reload();
            })
          }
        })
      }
    });
  }

  descargarFacturaEvt(venta: Venta): void{
    Swal.fire({
      title: `¿Desea descargar la factura ${venta.correlativo} del cliente ${venta.cliente.nombre}?`,
      showConfirmButton: true,
      showCancelButton: true,
      icon: "question",
      confirmButtonText: "Descargar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.descargarFactura(venta.codigoVenta).subscribe({
          next: (response: HttpResponse<Blob>) => {
            const pdfFactura = response.body!;
            //const contentDisposition = response.headers.get('Content-Disposition');
            let fileName = `Factura_${venta.correlativo}.pdf`;
            // Crea la URL del Blob y descarga el archivo
            const blobUrl = URL.createObjectURL(pdfFactura);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;
            link.click();
            URL.revokeObjectURL(blobUrl);
          }
        })
      }
    });
  }

}
