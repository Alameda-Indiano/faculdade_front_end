'use client';

import { Card, Table, TableBody, TableContainer } from '@mui/material';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';

import { Routes } from '../../../../app/routes';
import { IFrequencyEntity } from '../../../../domain/entities/IFrequencyEntity';
import { useFrequencyRepository } from '../../../../infrastructure/repositories/frequency';
import { GridLoading } from '../../../components/gridLoading';
import { TableHead, useTable } from '../../../components/table';
import { useBoolean } from '../../../hooks/useBoolean';
import { useDebounce } from '../../../hooks/useDebounce';
import { useFilters } from '../../../hooks/useFilters';
import { TableRow } from './components/tableRow';
import { TableToolbar } from './components/tableToolbar';
import { IFrequencyFilters } from './interfaces';
import { TABLE_HEAD } from './mock/tableHeader';
import { useAppSelector } from '../../../../infrastructure/contexts';
import { isArray } from 'lodash';

export const FrequenciesGrid = () => {
	const table = useTable({
		defaultRowsPerPage: 10,
	});

	const { rowsPerPage, page } = table;

	const isLoading = useBoolean(false);
	const router = useRouter();
	const { user } = useAppSelector((state) => state.app);
	const isAdmin = user?.type === 'ADMIN';

	const tableHead = isAdmin ? TABLE_HEAD : TABLE_HEAD.filter(item => item.label !== 'Usuário')

	const frequencyRepository = useFrequencyRepository();

	const [tableData, setTableData] = useState<IFrequencyEntity[]>([]);

	const { filters, onFilters } = useFilters<IFrequencyFilters>({
		initialFilters: {
			search: '',
		},
		onResetPage: table.onResetPage,
	});

	const debouncedSearch = useDebounce(filters.search);

	const dataInPage = tableData.slice(
		table.page * table.rowsPerPage,
		table.page * table.rowsPerPage + table.rowsPerPage,
	);

	const getGridItens = async (all: boolean): Promise<IFrequencyEntity[]> => {
		
		const dataFrequencies = await frequencyRepository.getAll(all ? debouncedSearch : user?.id)
		
		if (!dataFrequencies?.success) {
			enqueueSnackbar('Frequência Não Encontrada', {
				variant: 'error',
			});

			return []
		}

		if (dataFrequencies.data) {
			return isArray(dataFrequencies.data)
				? dataFrequencies.data
				: [dataFrequencies.data];
		}

		return [];
	};

	const queryDataTable = async () => {
		isLoading.onTrue();

		try {
			const data = await getGridItens(isAdmin);
			setTableData(data);
		} catch (error) {
			console.error(error);
			enqueueSnackbar('Erro Interno do Servidor!', { variant: 'error' });
		}

		isLoading.onFalse();
	};

	const queryDeleteFrequency = async (
		itemsSelectedDeletion: Array<string>,
	) => {
		const results: any[] = [];

		await itemsSelectedDeletion.reduce(async (previousPromise, id) => {
			await previousPromise;
			try {
				const data = await frequencyRepository.delete(id);
				results.push(data);
			} catch (error) {
				console.error(error);
				enqueueSnackbar('Erro Interno do Servidor!', {
					variant: 'error',
				});
			}
		}, Promise.resolve());

		const isErrorReq = results.some((result) => !result);

		if (isErrorReq) enqueueSnackbar('Erro ao deletar item!');
		else enqueueSnackbar('Items Deletados com Sucesso!');
	};

	const handleDeleteRow = useCallback(
		async (id: string) => {
			await queryDeleteFrequency([id]);
			setTableData(tableData.filter((row) => row.id !== id));
			table.onUpdatePageDeleteRow(dataInPage.length);
		},
		[dataInPage.length, table, tableData],
	);

	const handleEditRow = useCallback(
		(id: string) => {
			router.push(Routes.userEdit(id));
		},
		[router],
	);

	useEffect(() => {
		queryDataTable();
	}, [rowsPerPage, page, debouncedSearch, filters]);

	const renderTableContent = () => {
		if (tableData.length > 0)
			return tableData.map((row) => (
				<TableRow
					key={row.id}
					row={row as any}
					selected={table.selected.includes(String(row.id))}
					onSelectRow={() => table.onSelectRow(String(row.id))}
					onDeleteRow={() => handleDeleteRow(row.id!)}
					onEditRow={() => handleEditRow(row.id!)}
					filters={filters}
					canEdit={isAdmin}
				/>
			));
	};

	return (
		<Card sx={{ width: '70vw' }}>
			<TableToolbar filters={filters} onFilters={onFilters} />
			<TableContainer
				sx={{
					height: '45vh',
					maxHeight: '45vh',
					overflow: 'auto',
					scrollbarColor: '#888 transparent',
				}}
			>
				<Table size='small'>
					<TableHead
						canEdit={isAdmin}
						order={table.order}
						orderBy={table.orderBy}
						headLabel={tableHead}
						rowCount={tableData.length}
						numSelected={table.selected.length}
						onSort={table.onSort}
						onSelectAllRows={(checked) =>
							table.onSelectAllRows(
								checked,
								tableData.map((row: any) => row.id),
							)
						}
					/>
					<TableBody>
						{isLoading.value ? (
							<GridLoading
								columns={tableHead.length}
								rowsPerPage={table.rowsPerPage}
								hasConfigColumn={isAdmin}
							/>
						) : (
							renderTableContent()
						)}
					</TableBody>
				</Table>
			</TableContainer>
			{/* <TablePaginationCustom
				count={dataInPage.length}
				page={table.page}
				rowsPerPage={table.rowsPerPage}
				onPageChange={table.onChangePage}
				onRowsPerPageChange={table.onChangeRowsPerPage}
				dense
			/> */}
		</Card>
	);
};
