'use client';

import { useAppSelector } from '../../../infrastructure/contexts';
import { BodyMeasurementGrid } from '../../../interfaces/pages/bodyMeasurement';

export default function AuthPage() {
	const { user } = useAppSelector((state) => state.app);
	if (user?.type !== 'ADMIN') console.log('redirect-user') 
	
	return <BodyMeasurementGrid />;
}
