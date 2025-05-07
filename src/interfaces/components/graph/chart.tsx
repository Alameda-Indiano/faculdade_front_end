'use client';

import ReactApexChart from 'react-apexcharts';

interface LineChartProps {
	categories?: string[];
	seriesData: { name: string; data: number[] }[];
	height?: number;
}

export function LineChart({
	categories,
	seriesData,
	height = 500,
}: LineChartProps) {
	const options: ApexCharts.ApexOptions = {
		chart: {
			id: 'line-chart',
			toolbar: { show: false },
			zoom: { enabled: false },
		},
		xaxis: {
			categories,
			labels: {
				style: {
					colors: '#e5e7eb',
				},
			},
			title: { text: 'Período', style: { color: '#e5e7eb' } },
		},
		yaxis: {
			labels: {
				style: {
					colors: '#e5e7eb',
				},
				formatter: (value: number) => {
					// return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
					return value.toString();
				},
			},
			title: { text: 'Valores', style: { color: '#e5e7eb' } },
		},
		stroke: {
			curve: 'smooth',
			width: 2,
		},
		dataLabels: { enabled: false },
		tooltip: { enabled: true, theme: 'dark' },
		grid: {
			show: false,
		},
		colors: ['#77B6EA', '#545454'],
	};

	return (
		<div>
			<ReactApexChart
				options={options}
				series={seriesData.map(({ name, data }) => ({
					name,
					data,
				}))}
				type='line'
				height={height}
			/>
		</div>
	);
}
