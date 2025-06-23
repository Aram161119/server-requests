import { useState, useEffect, useCallback } from 'react';

const API_URL = '/api/todos';

export function useTodos(initialQuery) {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState(initialQuery);

	const fetchTodos = useCallback(async () => {
		setLoading(true);

		const params = new URLSearchParams({
			_page: query.page.toString(),
		});

		if (query.limit) params.set('_limit', query.limit.toString());
		if (query.order) params.set('_order', query.order.toString());
		if (query.sort) params.set('_sort', query.sort.toString());
		if (query.filter) params.set('title_like', query.filter.toString());

		const response = await fetch(`${API_URL}?${params.toString()}`);

		const itemsCount = response.headers.get('X-Total-Count');
		const pageTotalCount = getPageCount(itemsCount, query?.limit ?? 1);

		const data = await response.json();

		setTodos({ data: data, meta: { pageTotalCount } });
		setLoading(false);
	}, [query]);

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);

	// old version for discussing
	const onCreate = useCallback(
		async (data) => {
			await fetch(API_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify(data),
			});

			fetchTodos();
		},
		[fetchTodos],
	);

	// new version , added error handler mini version
	const onDelete = useCallback(async (id) => {
		const resp = await fetch(`${API_URL}/${id}`, {
			method: 'DELETE',
		});

		if (!resp.ok) {
			throw new Error('Something went wrong');
		}
	}, []);

	const onUpdate = useCallback(async (data) => {
		const resp = await fetch(`${API_URL}/${data.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(data),
		});

		if (!resp.ok) {
			throw new Error('Something went wrong');
		}
	}, []);

	const fetchTodo = useCallback(async (id) => {
		try {
			return await fetch(`${API_URL}/${id}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
			});
		} catch (error) {
			return error;
		}
	}, []);

	const getPageCount = (itemsCount = 1, limit = 1) => Math.ceil(itemsCount / limit);

	return { todos, loading, onCreate, onDelete, onUpdate, fetchTodo, query, setQuery };
}
