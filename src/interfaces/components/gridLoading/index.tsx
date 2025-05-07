import { Skeleton, TableCell, TableRow } from '@mui/material';
import { IGridLoadingProps } from './interfaces';

export const GridLoading = ({ columns, rowsPerPage, hasConfigColumn }: IGridLoadingProps) => {
	const cells = Array.from({ length: hasConfigColumn ? columns + 1 : columns }, (_, i) => (
		<TableCell key={i}>
			<Skeleton />
		</TableCell>
	));

	return Array.from({ length: rowsPerPage }, (_, i) => (
		<TableRow key={i}>{cells}</TableRow>
	));
};
