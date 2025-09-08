import { fetchTodosAsync } from '@/actions';
import Loader from '@/components/loader/Loader';
import Pagination from '@/components/Pagination/Pagination';
import { selectFilters, selectLoading, selectTodos } from '@/selectors';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoCard from '../TodoCard/TodoCard';

const TodoList = () => {
	const loading = useSelector(selectLoading);
	const todos = useSelector(selectTodos);
	const filters = useSelector(selectFilters);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTodosAsync(filters));
	}, [dispatch, filters]);

	if (loading) {
		return <Loader />;
	}

	if (!todos?.data?.length)
		return (
			<Typography variant="h4" mt={5} fontFamily={'monospace'}>
				Empty list :(
			</Typography>
		);

	return (
		<Box pt={3}>
			<Grid container spacing={3}>
				{todos?.data.map((todo) => (
					<TodoCard key={todo.id} todo={todo} />
				))}
			</Grid>
			<Pagination pageTotalCount={todos.meta?.pageTotalCount} />
		</Box>
	);
};

export default TodoList;
