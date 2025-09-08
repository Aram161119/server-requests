import { ACTION_TYPE } from '@/actions';
import { createTodo } from '@/api';

export const createTodoAsync = (newTodoData) => (dispatch) => {
	dispatch({ type: ACTION_TYPE.LOADING_START });

	return createTodo(newTodoData)
		.then(async (response) => {
			const todo = await response.json();

			dispatch({
				type: ACTION_TYPE.ADD_TODO,
				payload: todo,
			});
		})
		.finally(() => dispatch({ type: ACTION_TYPE.LOADING_END }));
};
