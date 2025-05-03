import { IFormProps } from '../types/formProps';

export const generateDefaultValues = (
	editBodyMeasurement?: IFormProps['editBodyMeasurement'],
) => ({
	id: editBodyMeasurement?.id || undefined,
	name: editBodyMeasurement?.name || '',
	email: editBodyMeasurement?.email || '',
	password: '',
});
