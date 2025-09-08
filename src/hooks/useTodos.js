import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = '/api/todos';

export function useTodos(initialQuery) {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState(initialQuery);

	const navigate = useNavigate();

	const fetchTodos = useCallback(async () => {
		const params = new URLSearchParams({
			_page: query.page.toString(),
		});

		if (query.limit) params.set('_limit', query.limit.toString());
		if (query.order) params.set('_order', query.order.toString());
		if (query.sort) params.set('_sort', query.sort.toString());
		if (query.filter) params.set('title_like', query.filter.toString());

		const response = await fetch(`${API_URL}?${params.toString()}`);

		if (!response.ok) {
			const errorData = await response.json();
			console.log('errorData', errorData);
			throw new Error(errorData.message || 'Failed to fetch todos list');
		}

		const itemsCount = response.headers.get('X-Total-Count');
		const pageTotalCount = getPageCount(itemsCount, query?.limit ?? 1);

		const data = await response.json();

		setTodos({ data: data, meta: { pageTotalCount } });
		setLoading(false);
	}, [query]);

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);

	const onCreate = useCallback(async (data) => {
		try {
			const resp = await fetch(API_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify(data),
			});

			if (!resp.ok) {
				const errorData = await resp.json();
				throw new Error(errorData.message || 'Failed to create todo');
			}

			return resp.json();
		} catch (error) {
			throw new Error(error.message || 'Post request failed');
		}
	}, []);

	const onDelete = useCallback(async (id) => {
		try {
			const resp = await fetch(`${API_URL}/${id}`, {
				method: 'DELETE',
			});

			if (!resp.ok) {
				const errorData = await resp.json();
				throw new Error(errorData.message || 'Failed to delete todo');
			}
		} catch (error) {
			throw new Error(error.message || 'Delete request failed');
		}
	}, []);

	const onUpdate = useCallback(async (data) => {
		try {
			const resp = await fetch(`${API_URL}/${data.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(data),
			});

			if (!resp.ok) {
				const errorData = await resp.json();
				throw new Error(errorData.message || 'Failed to update todo');
			}

			return await resp.json();
		} catch (error) {
			throw new Error(error.message || 'Update request failed');
		}
	}, []);

	const fetchTodo = useCallback(
		async (id) => {
			try {
				const resp = await fetch(`${API_URL}/${id}`, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json;charset=utf-8' },
				});

				if (!resp.ok) {
					const errorData = await resp.json();

					if (resp.status === 404) {
						navigate('/404', { replace: true });
					}

					throw new Error(errorData.message || 'Failed to fetch todo');
				}

				return await resp.json();
			} catch (error) {
				throw new Error(error.message || 'Fetch request failed');
			}
		},
		[navigate],
	);

	const getPageCount = (itemsCount = 1, limit = 1) => Math.ceil(itemsCount / limit);

	return {
		todos,
		loading,
		onCreate,
		onDelete,
		onUpdate,
		fetchTodo,
		query,
		setQuery,
		fetchTodos,
	};
}
