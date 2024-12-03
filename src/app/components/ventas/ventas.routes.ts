import { Routes } from "@angular/router";
import { FormularioVentaComponent } from "./formulario-venta/formulario-venta.component";

export const VENTAS_ROUTES: Routes = [
    {
        path: 'venta',
        component: FormularioVentaComponent
    }
]