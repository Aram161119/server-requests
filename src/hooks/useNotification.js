import { useContext } from 'react';
import { NotificationContext } from '@/context';

export const useNotification = () => {
	const notificaitonContext = useContext(NotificationContext);

	if (!notificaitonContext) return null;

	return notificaitonContext;
};
