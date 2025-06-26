import { Box, Typography, Grid } from '@mui/material';
import TodoCard from '../TodoCard/TodoCard';
import Loader from '@/components/loader/Loader';
import Pagination from '@/components/Pagination/Pagination';
import { use } from 'react';
import { TodosContext } from '@/context/context';

const TodoList = () => {
	const { query, setQuery, todos, loading } = use(TodosContext);

	if (loading) {
		return <Loader />;
	}

	if (!todos?.data?.length)
		return (
			<Typography variant="h4" mt={5} fontFamily={'monospace'}>
				Empty list :(
			</Typography>
		);

	const onChange = (value) => setQuery({ ...query, page: value });

	return (
		<Box pt={3}>
			<Grid container spacing={3}>
				{todos?.data.map((todo) => (
					<TodoCard key={todo.id} todo={todo} />
				))}
			</Grid>
			<Pagination
				onChange={onChange}
				page={query.page}
				pageTotalCount={todos.meta?.pageTotalCount}
			/>
		</Box>
	);
};

export default TodoList;
