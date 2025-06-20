import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNotification } from '@/hooks';

const MODAL_STYLE = {
	position: 'absolute',
	top: '30%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 3,
};

const DEFAULT_FORM_VALUES = { title: '' };

const schema = yup.object().shape({
	title: yup
		.string()
		.min(3, 'Minimum 3 characters')
		.max(255, 'Maximum 255 characters')
		.required('Title is required'),
});

const CreateTodoModal = ({ open, handleClose, initialValues, onCreate }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const { showNotification } = useNotification();

	useEffect(() => {
		if (open) {
			reset(initialValues ?? DEFAULT_FORM_VALUES);
		}
	}, [open, initialValues, reset]);

	const handleFormSubmit = (data) => {
		onCreate(data);
		showNotification('Todo successfully updated, please check))', 'success');
		reset();
		handleClose();
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="todo-modal-title"
			aria-describedby="todo-modal-description"
		>
			<Box sx={MODAL_STYLE}>
				<Typography variant="h5" component="h2" mb={2}>
					Create Todo
				</Typography>

				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit(handleFormSubmit)}
					sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
				>
					<TextField
						label="Title"
						{...register('title')}
						error={!!errors.title}
						helperText={errors.title?.message}
						fullWidth
					/>

					<Box display="flex" justifyContent="space-between">
						<Button variant="outlined" onClick={handleClose}>
							Close
						</Button>
						<Button variant="contained" type="submit">
							Create
						</Button>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};

CreateTodoModal.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	initialValues: PropTypes.shape({
		title: PropTypes.string,
	}),
	onCreate: PropTypes.func.isRequired,
};

CreateTodoModal.defaultProps = {
	initialValues: null,
};

export default CreateTodoModal;
