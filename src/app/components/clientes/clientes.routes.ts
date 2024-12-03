import { Routes } from "@angular/router";
import { FormularioClientesComponent } from "./formulario-clientes/formulario-clientes.component";
import { TablaClientesComponent } from "./tabla-clientes/tabla-clientes.component";

export const CLIENTES_ROUTES: Routes = [
    {
        path: 'clientes/crear',
        component: FormularioClientesComponent
    },
    {
        path: 'clientes/listar',
        component: TablaClientesComponent
    },
    {
        path: 'clientes/actualizar/:codigo',
        component: FormularioClientesComponent
    }
]