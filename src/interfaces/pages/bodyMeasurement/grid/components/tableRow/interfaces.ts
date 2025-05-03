import { IBodyMeasurementeEntity } from '../../../../../../domain/entities/IBodyMeasurementeEntity';
import { IBodyMeasurementFilters } from '../../interfaces';

export interface ITableRowProps {
	selected: boolean;
	onEditRow: VoidFunction;
	row?: IBodyMeasurementeEntity;
	onSelectRow: VoidFunction;
	filters: IBodyMeasurementFilters;
	onDeleteRow: VoidFunction;
}
