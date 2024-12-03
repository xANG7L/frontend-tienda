import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto';
import { Categoria } from '../../../models/categoria';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-formulario-productos',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './formulario-productos.component.html',
  styleUrl: './formulario-productos.component.css'
})
export class FormularioProductosComponent implements OnInit {

  actualizar: boolean = false;

  producto: Producto = new Producto()

  

  categorias: Categoria[] = []

  errors: any = {}

  constructor(
    private service: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.producto = new Producto();
    this.activatedRoute.paramMap.subscribe(params => {
      const codigo: string = (params.get('codigo') || '');
      if (codigo != '') {
        this.actualizar = true;
        this.buscarProductoParaActualizarEvt(codigo);
      }
    }
    )

    this.listarCategorias();
  }

  listarCategorias(): void {
    this.service.obtenerListadoDeCategoriasHttp().subscribe({
      next: categorias => {
        this.categorias = categorias
      },
      error: err => {
        console.log(err);
      }
    })
  }

  compararCategorias(o1: Categoria, o2: Categoria): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 == null || o2 == null ? false : o1.id == o2.id;
  }

  seleccionarCategoriaEvt(event: any): void {
    console.log(this.producto);
  }

  onSubmit(productForm: NgForm): void {
    console.log(this.producto);
    if (this.actualizar) {
      this.service.actualizarProductoHttp(this.producto).subscribe({
        next: productoDb => {
          Swal.fire({
            title: "Producto actualizado!",
            text: `El producto ${productoDb.nombre} ha sido actualizado correctamente!`,
            icon: "success"
          });
          productForm.resetForm();
          this.router.navigate(['productos/listar'])
        },
        error: err => {
          console.log(err);
          alert('error al actualizar producto');
        }
      })
    } else {
      this.service.crearProductoHttp(this.producto).subscribe({
        next: producto => {
          Swal.fire({
            title: "Registro agregado!",
            text: `El producto ${producto.nombre} ha sido registrado correctamente!`,
            icon: "success"
          });
          productForm.resetForm();
          this.router.navigate(['productos/listar'])
        },
        error: err => {
          this.errors = err.error;
        }
      })
    }
  }

  buscarProductoParaActualizarEvt(codigo: string): void {
    this.service.buscarProductoPorCodigoHttp(codigo).subscribe({
      next: producto => {
        this.producto = producto;
      },
      error: err => {
        console.log(err);
        alert('error al obtener el producto de la base de datos')
      }
    })
  }

  onCleanForm(productForm: NgForm): void {
    productForm.resetForm();
    this.producto = new Producto();
    if (this.actualizar) {
      this.actualizar = false;
      this.router.navigate(['productos/crear'])
    }
  }
}
