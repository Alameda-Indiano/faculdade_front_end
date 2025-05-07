'use client';

import { useAppSelector } from '../../../infrastructure/contexts';
import { SubscriptionsGrid } from '../../../interfaces/pages/subscription';

export default function AuthPage() {
	const { user } = useAppSelector((state) => state.app);
	if (user?.type !== 'ADMIN') console.log('redirect-user');

	return <SubscriptionsGrid />;
}
