'use client';

import { Box, CircularProgress, Alert, Card } from '@mui/material';
import { Tiles } from './components/tiles';
import { useEffect } from 'react';
import { styles } from './styles';
import { DASHBOARD_TILES } from './constants';
import AppAreaInstalled from '../../../components/graph';
import { useFrequencyChart } from '../../../hooks/useChart/useFrequencyChart';
import { useStatusCount } from '../../../hooks/useStatusCount';
import { useStatusRepository } from '../../../../infrastructure/repositories/status';
import { useFinancialChart } from '../../../hooks/useChart/useFinanceChart';

export const DashboardGrid = () => {
	const statusRepository = useStatusRepository();
	const {
		data: countTile,
		isLoading,
		error,
		fetchStatusCount,
	} = useStatusCount();

	const {
		isLoading: isLoadingFinancial,
		fetchData: fetchDataFinancial,
		chartData: chartDataFinancial,
	} = useFinancialChart('Financas', statusRepository.financialManagement);

	useEffect(() => {
		fetchStatusCount();
	}, [fetchStatusCount]);

	useEffect(() => {
		fetchDataFinancial();
	}, []);

	useEffect(() => console.log(chartDataFinancial), [chartDataFinancial]);
	if (isLoading.value) {
		return (
			<Box display='flex' justifyContent='center'>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box>
				<Alert severity='error'>{error.message}</Alert>
			</Box>
		);
	}

	return (
		<Card sx={{ width: '80vw', overflow: 'auto' }}>
			<Box sx={styles.tilesContainer}>
				<Tiles
					tiles={[
						{
							name: DASHBOARD_TILES.USERS,
							value: countTile.user.toString(),
						},
						{
							name: DASHBOARD_TILES.FREQUENCIES,
							value: countTile.frequency.toString(),
						},
						{
							name: DASHBOARD_TILES.SUBSCRIPTIONS,
							value: countTile.subscription.toString(),
						},
						{
							name: DASHBOARD_TILES.CLASSES,
							value: countTile.classe.toString(),
						},
					]}
				/>
			</Box>
			<Box mt={15}>
				<AppAreaInstalled
					title='Finanças'
					subheader='Gráfico indicativo de finanças'
					currentDateTxt='Diário'
					chart={chartDataFinancial}
					loading={isLoadingFinancial.value}
				/>
			</Box>
		</Card>
	);
};
