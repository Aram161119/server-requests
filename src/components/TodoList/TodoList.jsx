import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@mui/material';
import TodoCard from '../TodoCard/TodoCard';
import Loader from '@/components/loader/Loader';
import Pagination from '@/components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';

const TodoList = ({ loading = true, todos, query, setQuery }) => {
	const navigate = useNavigate();

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
					<TodoCard
						key={todo.id}
						todo={todo}
						onUpdate={() => navigate(`/todo/${todo.id}`)}
					/>
				))}
			</Grid>
		</Box>
	);
};

TodoList.propTypes = {
	loading: PropTypes.bool.isRequired,
	todos: PropTypes.array.isRequired,
	query: PropTypes.object,
	setQuery: PropTypes.func,
};

export default TodoList;
