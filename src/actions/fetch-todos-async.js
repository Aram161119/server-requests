import { ACTION_TYPE } from '../actions';
import { getTodos } from '../api';

export const fetchTodosAsync = (filters) => (dispatch) => {
	dispatch({ type: ACTION_TYPE.LOADING_START });

	return getTodos(filters)
		.then(async (response) => {
			const itemsCount = response.headers.get('X-Total-Count');
			const pageTotalCount = Math.ceil((itemsCount ?? 1) / (filters?.limit ?? 1));

			const data = await response.json();
			const transformedData = { data: data, meta: { pageTotalCount } };

			dispatch({ type: ACTION_TYPE.SET_TODOS, payload: transformedData });
		})
		.finally(() => dispatch({ type: ACTION_TYPE.LOADING_END }));
};
