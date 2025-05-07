'use client';

import { useEffect, useState } from 'react';
import { ISubscriptionEntity } from '../../../../domain/entities/ISubscriptionEntity';
import { useSubscriptionRepository } from '../../../../infrastructure/repositories/subscription';
import { SubscriptionForm } from '../../../../interfaces/pages/subscription/form';
import { IFormPageProps } from '../../../../interfaces/pages/user/form/types/IFormPageProps';
import Loading from '../../../loading';
import { useAppSelector } from '../../../../infrastructure/contexts';

export default function SubscriptionEditPage({ params }: IFormPageProps) {
	const { subscriptionid } = params;
	const subscriptionRepository = useSubscriptionRepository();
	const { user } = useAppSelector((state) => state.app);
	if (user?.type !== 'ADMIN') console.log('redirect-user');

	const [editSubscription, setSubscriptionEdit] = useState<
		ISubscriptionEntity | undefined
	>(undefined);

	const getDataPage = async () => {
		const response = await subscriptionRepository.getById(subscriptionid!);

		if (response.success) setSubscriptionEdit(response.data);
		else setSubscriptionEdit(undefined);
	};

	useEffect(() => {
		getDataPage();
	}, []);

	return editSubscription ? (
		<SubscriptionForm editSubscriptions={editSubscription} />
	) : (
		<Loading />
	);
}
