import { createTodoAsync, fetchTodosAsync } from '@/actions';
import { NotificationContext } from '@/context/context';
import { selectFilters } from '@/selectors';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { use, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

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

const CreateTodoModal = ({ open, handleClose }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const { showNotification } = use(NotificationContext);
	const dispatch = useDispatch();
	const filters = useSelector(selectFilters);

	useEffect(() => {
		if (open) {
			reset(DEFAULT_FORM_VALUES);
		}
	}, [open, reset]);

	const handleFormSubmit = async (data) => {
		try {
			dispatch(createTodoAsync(data));
			dispatch(fetchTodosAsync(filters));

			showNotification(
				'Todo successfully created and fetched table, please check))',
				'success',
			);
		} catch (error) {
			showNotification(error.message || 'Something went wrong', 'error');
		} finally {
			reset();
			handleClose();
		}
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
};

export default CreateTodoModal;
