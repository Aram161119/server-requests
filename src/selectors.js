export const selectTodos = ({ todos }) => todos;
export const selectFilters = ({ filters }) => filters;
export const selectLoading = ({ loading }) => loading;
export const selectTodoById =
	(id) =>
	({ todos }) =>
		todos?.data?.find((todo) => todo.id === id);
