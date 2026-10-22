import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-producto-lista',
  standalone: false,
  templateUrl: './producto-lista.component.html',
})
export class ProductoListaComponent {

  productos: Producto[];

  constructor(private productosServicio: ProductoService, private enrutador: Router) { }

  ngOnInit() {
    //Cargar productos
    this.obtenerProductos();
  }

  private obtenerProductos() {
    //Consumir los datos del observable (suscribirnos)
    this.productosServicio.obtenerProductosLista().subscribe(
      (datos => {
        this.productos = datos;
      })
    );
  }

  editarProducto(id: number) {
    this.enrutador.navigate(['editar-producto', id]);
  }

  eliminarProducto(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosServicio.eliminarProducto(id).subscribe(
          {
            next: (datos) => this.obtenerProductos(),
            error: (errorres) => console.log(errorres)
          }
        );
        Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
      }
    });
  }
}
