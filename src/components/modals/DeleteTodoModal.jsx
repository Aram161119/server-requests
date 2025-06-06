import { Button, Box, Typography, Modal } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const style = {
	position: 'absolute',
	top: '30%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 3,
};

const DeleteTodoModal = ({ open, data, handleClose, onDelete }) => {
	const { handleSubmit } = useForm();

	const onSubmit = () => {
		onDelete(data.id);
		handleClose();
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography variant="h5" textAlign="left" mb={2}>
					Delete Todo
				</Typography>

				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit(onSubmit)}
					sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
				>
					<Typography mb={3}>
						Are you sure you want to delete{' '}
						<strong>{data?.title || 'this'}</strong> todo?
					</Typography>

					<Box display="flex" justifyContent="space-between">
						<Button variant="outlined" onClick={handleClose}>
							Close
						</Button>
						<Button variant="contained" type="submit" color="error">
							Delete
						</Button>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};

DeleteTodoModal.propTypes = {
	open: PropTypes.bool,
	data: PropTypes.any,
	handleClose: PropTypes.func,
	onDelete: PropTypes.func,
};

export default DeleteTodoModal;
