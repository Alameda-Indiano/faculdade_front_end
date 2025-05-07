'use client';

import { useAppSelector } from '../../../../infrastructure/contexts';
import { BodyMeasurementForm } from '../../../../interfaces/pages/bodyMeasurement';

export default function BodyMeasurementPage() {
	const { user } = useAppSelector((state) => state.app);
	if (user?.type !== 'ADMIN') console.log('redirect-user') 
		
	return <BodyMeasurementForm />;
}
