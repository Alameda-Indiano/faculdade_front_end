import { MenuItem, Select, Stack } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IUserEntity } from '../../../../../../domain/entities/IUserEntity';
import { useUserRepository } from '../../../../../../infrastructure/repositories/user';
import { enqueueSnackbar } from 'notistack';

export const TableToolbar = ({
	setUserId,
}: {
	setUserId: Dispatch<SetStateAction<string | null>>;
}) => {
	const userRepository = useUserRepository();
	const [users, setUsers] = useState<IUserEntity[]>([]);

	const getFormDependencies = async () => {
		try {
			const respose = await userRepository.getAll();
			if (respose.success) setUsers(respose.data || []);
		} catch (error) {
			console.log(error);
			enqueueSnackbar('Erro Interno do Servidor!', { variant: 'error' });
		}
	};

	useEffect(() => {
		getFormDependencies();
	}, []);

	return (
		<Stack
			sx={{
				p: 3,
				display: 'flex',
				flex: 'wrap',
				alignItems: 'center',
				justifyContent: 'space-between',
				gap: 2,
			}}
		>
			<Stack
				direction='row'
				alignItems='center'
				spacing={2}
				flexGrow={1}
				sx={{ width: 1 }}
			>
				{users && users.length > 0 && (
					<Select
						sx={{ width: '100%' }}
						fullWidth
						name='user_id'
						label='Usuário'
						onChange={(e) => setUserId(e.target.value as string)}
					>
						{users.map(({ name, id }) => (
							<MenuItem
								//@ts-ignore
								key={id}
								value={id}
							>
								{name}
							</MenuItem>
						))}
					</Select>
				)}
			</Stack>
		</Stack>
	);
};
