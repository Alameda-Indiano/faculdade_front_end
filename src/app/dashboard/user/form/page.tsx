'use client';

import { useAppSelector } from '../../../../infrastructure/contexts';
import { UserForm } from '../../../../interfaces/pages/user';

export default function UserPage() {
	const { user } = useAppSelector((state) => state.app);
	if (user?.type !== 'ADMIN') console.log('redirect-user');

	return <UserForm />;
}
