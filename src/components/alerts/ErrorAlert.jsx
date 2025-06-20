import { Alert, Box, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ErrorAlert = (props) => {
	const { text } = props;
	const [open, setOpen] = useState(props.open);

	return (
		<Box sx={{ width: 400, position: 'absolute', top: 16, right: 24, zIndex: 1 }}>
			<Collapse in={open}>
				<Alert
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setOpen(false);
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
					severity={'error'}
					sx={{ mb: 2 }}
				>
					{text}
				</Alert>
			</Collapse>
		</Box>
	);
};

ErrorAlert.propTypes = {
	text: PropTypes.string,
	open: PropTypes.bool,
};

ErrorAlert.defaultProps = {
	open: true,
};

export default ErrorAlert;
