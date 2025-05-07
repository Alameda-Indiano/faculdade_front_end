'use client';

import { useEffect } from 'react';
import { IUserEntity } from '../../../../domain/entities/IUserEntity';
import { useAppSelector } from '../../../../infrastructure/contexts';
import { useFrequencyRepository } from '../../../../infrastructure/repositories/frequency';
import { isToday } from '../../../../infrastructure/utils/isToday';
import { FrequenciesForm } from '../../../../interfaces/pages/frequencies';
import { IFrequencyRepository } from '../../../../domain/repositories/IFrequency.repo';

export default function FrequenciesPage() {
	const { user } = useAppSelector((state) => state.app);
	const frequencyRepository = useFrequencyRepository();

	// Caso especial onde deve ser checado se o usuário já registrou ou não uma presença no dia
	useEffect(() => {
		if (user?.type !== 'ADMIN') checkUserCanAccess(user, frequencyRepository).catch(e => console.log(e))
	}, [])
	
	return <FrequenciesForm />;
}

async function checkUserCanAccess(user: IUserEntity | undefined, repository: IFrequencyRepository ){
	const { data, success} = await repository.getAll(user?.id);
	if(success && data){
		const canCreateRegister = data.filter(item => isToday(new Date(item.created_at ?? ""))).length === 0;

		if(!canCreateRegister) console.log('redirect-user')
	}
}