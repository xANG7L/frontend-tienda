import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FiltroProductosComponent } from './filtro-productos/filtro-productos.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { Venta } from '../../../models/venta';
import { DetalleVenta } from '../../../models/detalleVenta';
import { Producto } from '../../../models/producto';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';
import { VentaService } from '../../../services/venta.service';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';

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

  constructor(private service: VentaService) {
  }

  ngOnInit(): void {
    this.onIntEvt();
  }

  onIntEvt(): void {
    this.venta.fechaVenta = new Date();
    this.service.generarCorrelativo().subscribe(
      {
        next: json => {
          this.venta.correlativo = json.correlativo as string;
          this.venta.codigoVenta = json.codigo as number;
        },
        error: err => console.log(err)
      }
    )
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

  seleccionarClienteEvt(cliente: Cliente): void {
    this.venta.cliente = cliente;
    console.log(this.venta);
  }

  editarDetalleDeVenta(dvEmmitter: DetalleVenta): void {
    this.detalleVenta = [...this.detalleVenta.map(detalle => detalle.producto.codigo === dvEmmitter.producto.codigo ? { ...dvEmmitter } : detalle)];
    this.calcularTotales();
  }

  eliminarProducto(codigoProducto: string): void {
    this.detalleVenta = [...this.detalleVenta.filter(dv => dv.producto.codigo != codigoProducto)];
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

  get obtenerFechaActual(): string {
    let anio: any = this.venta.fechaVenta.getFullYear();
    let mes: any = this.venta.fechaVenta.getMonth() + 1;
    let dia: any = this.venta.fechaVenta.getDate();

    if (mes < 10) {
      mes = '0' + mes;
    }
    if (dia < 10) {
      dia = '0' + dia;
    }
    //return `${anio}-${mes}-${dia}`;
    return `${dia}/${mes}/${anio}`;
  }

  onSubmit(ventaForm: NgForm) {
    this.venta.detalleVenta = this.detalleVenta;

    this.service.facturarVenta(this.venta).subscribe({
      next: res => {
        Swal.fire({
          title: res.mensaje as string,
          text: "Venta facturada con exito!!",
          icon: "success"
        }).then(() => {
          this.service.descargarFactura(this.venta.codigoVenta).subscribe({
            next: (response: HttpResponse<Blob>) => {
              const pdfFactura = response.body!;
              //const contentDisposition = response.headers.get('Content-Disposition');
              let fileName = `Factura_${this.venta.correlativo}.pdf`;
              // Crea la URL del Blob y descarga el archivo
              const blobUrl = URL.createObjectURL(pdfFactura);
              const link = document.createElement('a');
              link.href = blobUrl;
              link.download = fileName;
              link.click();
              URL.revokeObjectURL(blobUrl);
              ventaForm.resetForm();
              window.location.reload();
            }
          })

        });
      },
      error: err => {
        console.log(err);
        alert('Error al facturar la venta')
      }
    })
    // console.log(this.venta);
  }

}
