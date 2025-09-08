import { PageHeader, TodoList } from '@/components';
import { Box, Typography } from '@mui/material';

const MainPage = () => (
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
				<PageHeader />
				<TodoList />
			</Box>
		</Box>
	</Box>
);

export default MainPage;
