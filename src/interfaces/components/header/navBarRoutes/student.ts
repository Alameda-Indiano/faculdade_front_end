import { Routes } from '../../../../app/routes';
import { INavBarRoutes } from '../navBar/types/INavBarRoutes';

export const studentNavBar: INavBarRoutes[] = [
    {
        title: 'Dashboard',
        icon: 'home',
        route: Routes.dashboard,
    },
    {
        title: 'Frequência',
        icon: 'calendar-check',
        route: Routes.frequencies,
    },
    {
        title: 'Histórico de Pagamentos',
        icon: 'money-bill',
        route: Routes.paymentHistory,
    },
    {
        title: 'Classes de Aula',
        icon: 'users-class',
        route: Routes.class,
    },
    {
        title: 'Medidas',
        icon: 'ruler',
        route: Routes.bodyMeasurement,
    }  
];
