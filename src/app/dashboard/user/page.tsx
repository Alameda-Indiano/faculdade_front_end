'use client';

import { useAppSelector } from '../../../infrastructure/contexts';
import { UserGrid } from '../../../interfaces/pages/user';

export default function AuthPage() {
	const { user } = useAppSelector((state) => state.app);
	if (user?.type !== 'ADMIN') console.log('redirect-user');

	return <UserGrid />;
}
