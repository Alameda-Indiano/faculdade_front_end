import { Routes } from '../../../../app/routes';
import { INavBarRoutes } from '../navBar/types/INavBarRoutes';

export const studentNavBar: INavBarRoutes[] = [
    {
        title: 'Progresso',
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
    }
];
