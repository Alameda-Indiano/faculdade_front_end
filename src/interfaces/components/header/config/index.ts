import { useMemo } from 'react';
import { useAppSelector } from '../../../../infrastructure/contexts';
import { INavBarRoutes } from '../navBar/types/INavBarRoutes';
import { adminNavBar } from '../navBarRoutes/admin';
import { studentNavBar } from '../navBarRoutes/student';

export const useNavBarConfig = (): INavBarRoutes[] => {
	const { user } = useAppSelector((state) => state.app);

	const configs = useMemo(
		() => ({
			default: user?.type === 'ADMIN'? adminNavBar : studentNavBar,
		}),
		[],
	);

	return useMemo(() => {
		return configs.default;
	}, [configs]);
};
