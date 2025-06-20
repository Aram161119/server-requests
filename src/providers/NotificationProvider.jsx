import PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@mui/material';
import { useState, useCallback } from 'react';
import { NotificationContext } from '@/context';

export const NotificationProvider = ({ children }) => {
	const [notification, setNotification] = useState(null);

	const showNotification = useCallback((message, variant = 'info', duration = 3000) => {
		setNotification({ message, variant, duration });

		setTimeout(() => setNotification(null), duration);
	}, []);

	return (
		<NotificationContext.Provider value={{ showNotification }}>
			{children}
			{notification && (
				<Alert
					sx={{
						position: 'absolute',
						top: 16,
						right: 24,
					}}
					severity={notification.variant}
					onClose={() => {}}
				>
					<AlertTitle>{notification.variant.toUpperCase()}</AlertTitle>
					{notification.message}
				</Alert>
			)}
		</NotificationContext.Provider>
	);
};

NotificationProvider.propTypes = {
	children: PropTypes.node,
};
