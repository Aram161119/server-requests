import { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { DeleteTodoModal, CreatOrUpdateTodoModal } from './components/modals';
import { useTodos } from './hooks';
import { defaultFilters } from './static/staticData';
import { TodoList, PageHeader } from '@/components';

function App() {
	const { todos, loading, onCreate, onDelete, onUpdate, query, setQuery } =
		useTodos(defaultFilters);
	const [data, setData] = useState(null);

	const [open, setOpen] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	const handleClose = () => {
		setOpen(false);
		setData(null);
	};

	const handleCreate = (data) => {
		onCreate(data);
		handleClose;
	};

	const handleUpdate = (data) => {
		onUpdate(data);
		handleClose();
	};

	const handleDelete = (id) => {
		onDelete(id);
		setOpenDeleteModal(false);
	};

	const openUpdateModal = (data) => {
		setOpen(true);
		setData(data);
	};

	const handleOpenDeleteModal = (data) => {
		setOpenDeleteModal(true);
		setData(data);
	};

	const handleCloseDeleteModal = () => {
		setOpenDeleteModal(false);
		setData(null);
	};

	return (
		<Box height={'100%'} display={'flex'} justifyContent={'center'}>
			<Box width={1135}>
				<Typography mb={2} variant="h3" fontFamily="monospace" fontWeight={700}>
					Todo List
				</Typography>

				<Box
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'space-between'}
				>
					<PageHeader setOpen={setOpen} setQuery={setQuery} query={query} />
					<TodoList
						loading={loading}
						todos={todos}
						openUpdateModal={openUpdateModal}
						openDeleteModal={handleOpenDeleteModal}
						setQuery={setQuery}
						query={query}
					/>
				</Box>
			</Box>

			<CreatOrUpdateTodoModal
				open={open}
				handleClose={handleClose}
				initialValues={data}
				onCreate={handleCreate}
				onUpdate={handleUpdate}
			/>

			<DeleteTodoModal
				open={openDeleteModal}
				data={data}
				handleClose={handleCloseDeleteModal}
				onDelete={handleDelete}
			/>
		</Box>
	);
}

export default App;
