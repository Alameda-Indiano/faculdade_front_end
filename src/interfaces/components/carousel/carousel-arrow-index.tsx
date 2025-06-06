// @mui
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { SxProps, Theme, styled, useTheme } from '@mui/material/styles';
import { IconProps } from '../icon/types';
import { LeftIcon, RightIcon } from './arrow-icons';

// ----------------------------------------------------------------------

const StyledRoot = styled(Box)(({ theme }) => ({
	zIndex: 9,
	display: 'inline-flex',
	alignItems: 'center',
	position: 'absolute',
	bottom: theme.spacing(2),
	right: theme.spacing(2),
	padding: theme.spacing(0.25),
	color: theme.palette.common.white,
	borderRadius: theme.shape.borderRadius,
}));

const StyledIconButton = styled(IconButton)({
	'width': 28,
	'height': 28,
	'padding': 0,
	'opacity': 0.48,
	'&:hover': { opacity: 1 },
});

// ----------------------------------------------------------------------

type Props = {
	index: number;
	total: number;
	icon?: IconProps; // Right icon
	onNext?: VoidFunction;
	onPrev?: VoidFunction;
	sx?: SxProps<Theme>;
};

export default function CarouselArrowIndex({
	index,
	total,
	onNext,
	onPrev,
	icon,
	sx,
	...other
}: Props) {
	const theme = useTheme();

	const isRTL = theme.direction === 'rtl';

	return (
		<StyledRoot sx={sx} {...other}>
			<StyledIconButton color='inherit' onClick={onPrev}>
				<LeftIcon icon={icon} isRTL={isRTL} />
			</StyledIconButton>

			<Typography variant='subtitle2' component='span' sx={{ mx: 0.25 }}>
				{index + 1}/{total}
			</Typography>

			<StyledIconButton color='inherit' onClick={onNext}>
				<RightIcon icon={icon} isRTL={isRTL} />
			</StyledIconButton>
		</StyledRoot>
	);
}
