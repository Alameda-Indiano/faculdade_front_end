'use client';

import { Box, Card } from '@mui/material';
import { useEffect } from 'react';
import { useStatusRepository } from '../../../../infrastructure/repositories/status';
import AppAreaInstalled from '../../../components/graph';
import { useFrequencyChart } from '../../../hooks/useChart/useFrequencyChart';

export const FrequencyChart = () => {
	const statusRepository = useStatusRepository();

	const {
		isLoading: isLoadingFrequency,
		fetchData: fetchDataFrequency,
		chartData: chartDataFrequency,
	} = useFrequencyChart(
		'Frequências',
		statusRepository.studentAttendance,
		'attendance',
	);

	useEffect(() => {
		fetchDataFrequency();
	}, []);

	return (
		<Card sx={{ width: '80%' }}>
			<Box>
				<AppAreaInstalled
					title='Frequências'
					subheader='Gráfico indicativo de frequências'
					currentDateTxt='Diário'
					chart={chartDataFrequency}
					loading={isLoadingFrequency.value}
				/>
			</Box>
		</Card>
	);
};
