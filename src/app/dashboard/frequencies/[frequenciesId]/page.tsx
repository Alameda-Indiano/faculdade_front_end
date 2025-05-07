'use client';

import { useEffect, useState } from 'react';
import { IFrequencyEntity } from '../../../../domain/entities/IFrequencyEntity';
import { useFrequencyRepository } from '../../../../infrastructure/repositories/frequency';
import { FrequenciesForm } from '../../../../interfaces/pages/frequencies/form';
import { IFormPageProps } from '../../../../interfaces/pages/user/form/types/IFormPageProps';
import Loading from '../../../loading';
import { useAppSelector } from '../../../../infrastructure/contexts';

export default function FrequenciesEditPage({ params }: IFormPageProps) {
	const { userId } = params;
	const frequencyRepository = useFrequencyRepository();
	const { user } = useAppSelector((state) => state.app);
	if (user?.type !== 'ADMIN') console.log('redirect-user');

	const [editFrequencies, setFrequenciesEdit] = useState<
		IFrequencyEntity | undefined
	>(undefined);

	const getDataPage = async () => {
		const response = await frequencyRepository.getById(userId!);

		if (response.success) setFrequenciesEdit(response.data);
		else setFrequenciesEdit(undefined);
	};

	useEffect(() => {
		getDataPage();
	}, []);

	return editFrequencies ? (
		<FrequenciesForm editFrequencies={editFrequencies} />
	) : (
		<Loading />
	);
}
