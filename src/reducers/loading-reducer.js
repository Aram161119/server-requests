import { ACTION_TYPE } from '@/actions';

export const loadingReducer = (state = true, { type }) => {
	switch (type) {
		case ACTION_TYPE.LOADING_START:
			return true;
		case ACTION_TYPE.LOADING_END:
			return false;
		default:
			return state;
	}
};
