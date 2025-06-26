import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { NotificationContext } from '@/context/context';
import AlertVariant1 from '@/components/alerts/AlertVariant1';

const alertComponents = {
	variant1: AlertVariant1,
};

export const NotificationProvider = ({ children }) => {
	const [notification, setNotification] = useState(null);

	const showNotification = useCallback(
		(message, variant = 'info', duration = 3000, alertVariant = 'variant1') => {
			setNotification({ message, variant, duration, alertVariant });

			setTimeout(() => setNotification(null), duration);
		},
		[],
	);

	const AlertComponent = notification
		? alertComponents[notification.alertVariant] || AlertVariant1
		: null;

	return (
		<NotificationContext value={{ showNotification }}>
			{children}
			{notification && (
				<AlertComponent
					variant={notification.variant}
					message={notification.message}
				/>
			)}
		</NotificationContext>
	);
};

NotificationProvider.propTypes = {
	children: PropTypes.node,
};
