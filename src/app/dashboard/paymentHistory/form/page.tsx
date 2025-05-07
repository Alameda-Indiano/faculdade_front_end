'use client';

import { useAppSelector } from '../../../../infrastructure/contexts';
import { PaymentHistoryForm } from '../../../../interfaces/pages/paymentHistory';

export default function PaymentHistoryPage() {
	const { user } = useAppSelector((state) => state.app);
	if (user?.type !== 'ADMIN') console.log('redirect-user');

	return <PaymentHistoryForm />;
}
