export interface INavbar {
    nombre: string;
    link?: string;
    icon?: string;
    items?: INavbar[];
    open?: boolean;
}

export const navBarData: INavbar[] = [
    {
        nombre: 'Clientes',
        icon: 'fa-solid fa-users',
        open: false,
        items: [
            {
                nombre: 'Crear cliente',
                link: '/clientes/crear'
            },
            {
                nombre: 'Listar cliente',
                link: '/clientes/listar'
            }
        ]
    },
    {
        nombre: 'Productos',
        icon: 'fa-solid fa-box',
        items: [
            {
                nombre: 'Crear producto',
                link: '/productos/crear'
            },
            {
                nombre: 'Listar productos',
                link: '/productos/listar'
            }
        ]
    },
    {
        nombre: 'Venta',
        icon: 'fa-solid fa-file-invoice',
        items: [
            {
                nombre: 'Facturar venta',
                link: '/venta'
            },
        ]
    },
]