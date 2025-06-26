import { Alert, AlertTitle } from '@mui/material';
import PropTypes from 'prop-types';

const AlertVariant1 = ({ variant, message }) => {
	return (
		<Alert
			sx={{
				position: 'absolute',
				top: 16,
				right: 24,
			}}
			severity={variant}
			onClose={() => {}}
		>
			<AlertTitle>{variant.toUpperCase()}</AlertTitle>
			{message}
		</Alert>
	);
};

AlertVariant1.propTypes = {
	message: PropTypes.string,
	variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

AlertVariant1.defaultProps = {
	variant: 'success',
};

export default AlertVariant1;
