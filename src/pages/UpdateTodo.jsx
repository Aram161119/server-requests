import { updateTodoAsync } from '@/actions';
import { DeleteTodoModal } from '@/components/modals';
import { NotificationContext } from '@/context/context';
import { selectLoading, selectTodoById } from '@/selectors';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Button, TextField, Typography } from '@mui/material';
import { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object().shape({
	title: yup
		.string()
		.min(3, 'Minimum 3 characters')
		.max(255, 'Maximum 255 characters')
		.required('Title is required'),
});

const UpdateTodo = () => {
	const { showNotification } = use(NotificationContext);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	const loading = useSelector(selectLoading);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const todo = useSelector(selectTodoById(Number(id)));

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		values: todo,
	});

	const handleFormSubmit = async (data) => {
		try {
			dispatch(updateTodoAsync({ id: todo.id, ...data }));
			showNotification('Todo successfully updated, please check))', 'success');
		} catch (error) {
			showNotification(error.message, 'warning');
		} finally {
			reset();
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
