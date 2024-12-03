import { Routes } from "@angular/router";
import { FormularioProductosComponent } from "./formulario-productos/formulario-productos.component";
import { TablaProductosComponent } from "./tabla-productos/tabla-productos.component";

export const PRODUCTOS_ROUTES: Routes = [
    {
        path: 'productos/crear',
        component: FormularioProductosComponent
    },
    {
        path: 'productos/actualizar/:codigo',
        component: FormularioProductosComponent
    },
    {
        path: 'productos/listar',
        component: TablaProductosComponent
    }
]