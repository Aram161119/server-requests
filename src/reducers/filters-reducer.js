import { ACTION_TYPE } from '@/actions';

const queryInitialState = {
	filter: '',
	page: 1,
	limit: 9,
	sort: '',
	order: '',
};

export const filtersReducer = (state = queryInitialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_SEARCH:
			return {
				...state,
				filter: payload,
			};
		case ACTION_TYPE.SET_PAGE:
			return {
				...state,
				page: payload,
			};
		case ACTION_TYPE.SET_ALPHA_SORT:
			return {
				...state,
				order: payload.order,
				sort: payload.sort,
			};
		case ACTION_TYPE.RESET_SEARCH:
			return queryInitialState;
		default:
			return state;
	}
};
