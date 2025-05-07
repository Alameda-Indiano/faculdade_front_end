'use client';

import { useAppSelector } from '../../../../infrastructure/contexts';
import { ClassForm } from '../../../../interfaces/pages/class';

export default function ClassPage() {
	const { user } = useAppSelector((state) => state.app);
	if (user?.type !== 'ADMIN') console.log('redirect-user');

	return <ClassForm />;
}
