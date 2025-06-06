import { IResponse } from '../../types/IResponse';
import { IUserEntity } from '../entities/IUserEntity';

export type IAuthDTO = Pick<IUserEntity, 'email' | 'password'>;

export type IAuthPayload = {
	user: IUserEntity;
	token: string;
	refresh: string;
};

export type IAuthUserRES = IResponse<IAuthPayload>;
