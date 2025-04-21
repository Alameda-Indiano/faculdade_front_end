export interface IUserEntity {
	id?: string;
	name?: string;
	email?: string;
	password?: string;
	type?: 'INSTRUTOR' | 'STUDENT';
	created_at?: string;
	updated_at?: string;
}
