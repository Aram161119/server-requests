import { HTTP_METHOD } from '@/constants';

const fetchServer = async (method, { id, ...payload } = {}) => {
	let API_URL = '/api/todos';

	let options = {
		method,
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
	};

	if (id && method === HTTP_METHOD.GET) {
		API_URL += `/${id}`;
	} else if (method === HTTP_METHOD.GET) {
		const { query } = payload;

		const params = new URLSearchParams({
			_page: query.page.toString(),
		});

		if (query.limit) params.set('_limit', query.limit.toString());
		if (query.order) params.set('_order', query.order.toString());
		if (query.sort) params.set('_sort', query.sort.toString());
		if (query.filter) params.set('title_like', query.filter.toString());

		API_URL += `?${params.toString()}`;
	} else {
		if (method !== HTTP_METHOD.POST) {
			API_URL += `/${id}`;
		}

		if (method !== HTTP_METHOD.DELETE) {
			options.body = JSON.stringify(payload);
		}
	}

	const response = await fetch(API_URL, options);

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || 'Server error');
	}

	return response;
};

export const getTodos = (query) => fetchServer(HTTP_METHOD.GET, { query });

export const getTodo = (id) => fetchServer(HTTP_METHOD.GET, { id });

export const createTodo = (newTodo) => fetchServer(HTTP_METHOD.POST, newTodo);

export const updateTodo = (updatedTodo) => fetchServer(HTTP_METHOD.PATCH, updatedTodo);

export const deleteTodo = (id) => fetchServer(HTTP_METHOD.DELETE, { id });
