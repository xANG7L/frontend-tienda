import { Routes } from '@angular/router';
import { DashboardComponent } from './shared/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/menu',
        pathMatch: 'full'
    },
    {
        path: 'menu',
        component: DashboardComponent
    },
    {
        path: '',
        loadChildren: () => import('./components/clientes/clientes.routes').then(c => c.CLIENTES_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./components/ventas/ventas.routes').then(v => v.VENTAS_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./components/productos/productos.routes').then(p => p.PRODUCTOS_ROUTES)
    }
];
