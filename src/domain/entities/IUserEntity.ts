import { IBodyMeasurementEntity } from './IBodyMeasurementEntity';
import { IClasseEntity } from './IClasseEntity';

export type UserType = 'STUDENT' | 'ADMIN';

export interface IUserEntity {
	id?: string;
	name?: string;
	email?: string;
	password?: string;
	type?: UserType;
	classes?: IClasseEntity[];
	body_measurements?: IBodyMeasurementEntity[];
	created_at?: string;
	updated_at?: string;
}
