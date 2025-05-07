'use client';

import { useAppSelector } from '../../../../infrastructure/contexts';
import { SubscriptionForm } from '../../../../interfaces/pages/subscription';

export default function SubscriptionPage() {
	const { user } = useAppSelector((state) => state.app);
	if (user?.type !== 'ADMIN') console.log('redirect-user');

	return <SubscriptionForm />;
}
