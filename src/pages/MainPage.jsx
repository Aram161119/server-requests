import { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { CreateTodoModal } from '@/components/modals';
import { useTodos } from '@/hooks';
import { defaultFilters } from '@/static/staticData';
import { TodoList, PageHeader } from '@/components';

const MainPage = () => {
	const { todos, loading, onCreate, query, setQuery } = useTodos(defaultFilters);
	const [data, setData] = useState(null);

	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
		setData(null);
	};

	const handleCreate = (data) => {
		onCreate(data);
		handleClose;
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
						setQuery={setQuery}
						query={query}
					/>
				</Box>
			</Box>

			<CreateTodoModal
				open={open}
				handleClose={handleClose}
				initialValues={data}
				onCreate={handleCreate}
			/>
		</Box>
	);
};

export default MainPage;
