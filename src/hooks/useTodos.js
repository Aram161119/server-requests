import { useState, useEffect, useCallback } from 'react';
import { todosRef, todoRef } from '../firebase';
import {
	addDoc,
	deleteDoc,
	updateDoc,
	where,
	onSnapshot,
	serverTimestamp,
	orderBy,
	query as FireabseQuery,
} from 'firebase/firestore';

export function useTodos(initialQuery) {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState(initialQuery);

	const prepareQuery = useCallback(() => {
		const sort = query?.sort?.toString() || 'title';
		const order = query.order.toString() || 'desc';
		const searchItem = query?.filter?.toString() || '';

		let q = FireabseQuery(todosRef, orderBy(sort, order));

		if (searchItem) {
			q = FireabseQuery(
				todosRef,
				where('title', '>=', searchItem),
				where('title', '<=', searchItem + '\uf8ff'),
				orderBy(sort, order),
			);
		}

		return q;
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

	const onUpdate = useCallback((data) => {
		updateDoc(todoRef(data.id), data);
	}, []);

	return { todos, loading, onCreate, onDelete, onUpdate, fetchTodo, query, setQuery };
}
