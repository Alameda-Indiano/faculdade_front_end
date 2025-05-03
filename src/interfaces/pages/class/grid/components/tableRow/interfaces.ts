import { IClassEntity } from '../../../../../../domain/entities/IClassEntity';
import { IClassFilters } from '../../interfaces';

export interface ITableRowProps {
	selected: boolean;
	onEditRow: VoidFunction;
	row?: IClassEntity;
	onSelectRow: VoidFunction;
	filters: IClassFilters;
	onDeleteRow: VoidFunction;
}
