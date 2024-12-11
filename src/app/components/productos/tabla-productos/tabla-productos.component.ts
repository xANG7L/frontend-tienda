import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto';
import { IBusquedaParam } from '../../../interfaces/IBusquedaParam';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-tabla-productos',
  standalone: true,
  imports: [
    RouterLink,
    NgxPaginationModule
  ],
  templateUrl: './tabla-productos.component.html',
  styleUrl: './tabla-productos.component.css'
})
export class TablaProductosComponent implements OnInit {

  parametros: IBusquedaParam[] = [];

  parametro!: IBusquedaParam;

  productos: Producto[] = [];

  currentPage: number = 1;

  constructor(private service: ProductoService, private router: Router) {
    this.parametros = [
      {
        id: 1,
        param: 'Dui del cliente'
      },
      {
        id: 2,
        param: 'Nombre del cliente'
      }
    ]
  }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos(): void {
    this.service.obtenerListaDeProductosHttp().subscribe({
      next: productos => {
        this.productos = productos;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  actualizarClienteRedirect(codigo: string) {
    this.router.navigate([`productos/actualizar/${codigo}`]);
  }

}
