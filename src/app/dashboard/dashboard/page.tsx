'use client';

import { useAppSelector } from '../../../infrastructure/contexts';
import { DashboardGrid } from '../../../interfaces/pages/dashboard';

export default function AuthPage() {
	const { user } = useAppSelector((state) => state.app);
	if (user?.type !== 'ADMIN') console.log('redirect-user');

	return <DashboardGrid />;
}
