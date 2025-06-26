import { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { CreateTodoModal } from '@/components/modals';
import { TodoList, PageHeader } from '@/components';

const MainPage = () => {
	const [open, setOpen] = useState(false);

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
					<PageHeader setOpen={setOpen} />
					<TodoList />
				</Box>
			</Box>

			<CreateTodoModal open={open} handleClose={() => setOpen(false)} />
		</Box>
	);
};

export default MainPage;
