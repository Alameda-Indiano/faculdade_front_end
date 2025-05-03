import { Routes } from '../../../../app/routes';
import { INavBarRoutes } from '../navBar/types/INavBarRoutes';

export const navBarDefault: INavBarRoutes[] = [
	{
		title: 'Dashboard',
		icon: 'home',
		route: Routes.dashboard,
	},
	{
		title: 'Usuários',
		icon: 'users',
		route: Routes.user,
	},
	{
		title: 'Frequencias',
		icon: 'calendar-check',
		route: Routes.frequencies,
	},
	{
		title: 'Histórico de Pagamentos',
		icon: 'money-bill',
		route: Routes.paymentHistory,
	},
	{
		title: 'Assinaturas',
		icon: 'book-font',
		route: Routes.subscription,
	},
];
