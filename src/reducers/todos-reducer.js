import { ACTION_TYPE } from '../actions';

const todosInitialState = [];

export const todosReducer = (state = todosInitialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_TODOS:
			return payload;
		case ACTION_TYPE.ADD_TODO:
			return state;
		case ACTION_TYPE.REMOVE_TODO:
			return {
				...state,
				data: state.data.filter(({ id }) => id !== payload),
			};
		case ACTION_TYPE.UPDATE_TODO:
			return {
				...state,
				data: state.data.map((todo) =>
					todo.id === payload.id ? { ...todo, ...payload } : todo,
				),
			};
		default:
			return state;
	}
};
