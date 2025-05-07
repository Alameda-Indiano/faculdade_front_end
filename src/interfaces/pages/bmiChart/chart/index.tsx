'use client';

import { Box, Card } from '@mui/material';
import AppAreaInstalled from '../../../components/graph';
import { useStatusRepository } from '../../../../infrastructure/repositories/status';
import { useEffect, useState } from 'react';
import { TableToolbar } from './components/tableToolbar';
import { useBmiChart } from '../../../hooks/useChart/useBmiChart';

export const BmiChart = () => {
	const statusRepository = useStatusRepository();
	const [userId, setUserId] = useState<string | null>(null);

	const {
		isLoading: isLoadingBmi,
		fetchData: fetchDataBmi,
		chartData: chartDataBmi,
	} = useBmiChart(
		'Indice de Massa Corporal',
		statusRepository.bmiProgress,
		userId,
	);

	useEffect(() => {
		if (userId) {
			fetchDataBmi();
		}
	}, [userId]);

	return (
		<Card sx={{ width: '70vw' }}>
			<TableToolbar setUserId={setUserId} />
			<Box>
				<AppAreaInstalled
					title='Indice de Massa Corporal'
					subheader='Gráfico indicativo de Indice de Massa Corporal'
					currentDateTxt='Diário'
					chart={chartDataBmi}
					loading={isLoadingBmi.value}
				/>
			</Box>
		</Card>
	);
};
