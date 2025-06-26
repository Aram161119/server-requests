import { Box, Typography, Button, TextField } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState, useCallback, use } from 'react';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DeleteTodoModal } from '@/components/modals';
import { NotificationContext, TodosContext } from '@/context/context';

const schema = yup.object().shape({
	title: yup
		.string()
		.min(3, 'Minimum 3 characters')
		.max(255, 'Maximum 255 characters')
		.required('Title is required'),
});

const UpdateTodo = () => {
	const { showNotification } = use(NotificationContext);
	const { onUpdate, fetchTodo } = use(TodosContext);

	const [todo, setTodo] = useState(null);
	const [loading, setLoading] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	const { id } = useParams();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		values: todo,
	});

	useEffect(() => {
		fetchTodoHandler();
	}, []);

	const fetchTodoHandler = useCallback(async () => {
		try {
			const resp = await fetchTodo(id);
			setTodo(resp);
		} catch (error) {
			showNotification(error.message || 'Something went wrong', 'error');
		}
	}, [fetchTodo, id, showNotification]);

	const handleFormSubmit = async (data) => {
		try {
			setLoading(true);

			const resp = await onUpdate(data);
			setTodo(resp);

			showNotification('Todo successfully updated, please check))', 'success');
		} catch (error) {
			showNotification(error.message, 'warning');
		} finally {
			reset();
			setLoading(false);
		}
	};

	if (!todo) return null;

	return (
		<Box display={'flex'} justifyContent={'center'}>
			<Box width={600} mt={10}>
				<Box display={'flex'} justifyContent={'space-between'} mb={5}>
					<Typography variant="h5" component="h2" mb={2}>
						Update Todo
					</Typography>
					<Button cursor={'pointer'} onClick={() => navigate('/')}>
						<ArrowBackOutlinedIcon color={'primary'} />
					</Button>
				</Box>

				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit(handleFormSubmit)}
					sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
				>
					<Box display={'flex'}>
						<TextField
							label="Title"
							{...register('title')}
							error={!!errors.title}
							helperText={errors.title?.message}
							fullWidth
						/>
						<Button
							onClick={() => setOpenDeleteModal(true)}
							sx={{ marginLeft: 2 }}
						>
							<DeleteOutlineOutlinedIcon color="error" />
						</Button>
					</Box>

					<Box mt={3}>
						<Button disabled={loading} variant="contained" type="submit">
							Update
						</Button>
					</Box>
				</Box>
			</Box>

			<DeleteTodoModal
				open={openDeleteModal}
				data={todo}
				handleClose={() => setOpenDeleteModal(false)}
			/>
		</Box>
	);
};

export default UpdateTodo;
