import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@mui/material';
import TodoCard from '../TodoCard/TodoCard';
import styles from './todoList.module.css';
import Pagination from '@/components/Pagination/Pagination';

const TodoList = ({
	loading = true,
	todos,
	openUpdateModal,
	openDeleteModal,
	query,
	setQuery,
}) => {
	if (loading)
		<Box
			height={620}
			alignItems={'center'}
			justifyContent={'center'}
			display={'flex'}
		>
			<Box className={styles.loader} />
		</Box>;

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
						onUpdate={() => openUpdateModal(todo)}
						onDelete={() => openDeleteModal(todo)}
					/>
				))}
			</Grid>
			<Pagination
				setQuery={setQuery}
				query={query}
				pageTotalCount={todos.meta?.pageTotalCount}
			/>
		</Box>
	);
};

TodoList.propTypes = {
	loading: PropTypes.bool.isRequired,
	todos: PropTypes.array.isRequired,
	openUpdateModal: PropTypes.func.isRequired,
	openDeleteModal: PropTypes.func.isRequired,
	query: PropTypes.object,
	setQuery: PropTypes.func,
};

export default TodoList;
