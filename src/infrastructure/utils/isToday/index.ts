export const isToday = (date: Date): boolean => {
	const today = new Date();

	return (
		date.getFullYear() === today.getFullYear() &&
		date.getMonth() === today.getMonth() &&
		date.getDay() === today.getDay()
	);
};
