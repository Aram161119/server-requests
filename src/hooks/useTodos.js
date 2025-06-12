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
		try {
			const q = prepareQuery();
			const unsubscribe = onSnapshot(q, async (snapshot) => {
				const todosArray = snapshot.docs.map((doc) => ({
					id: doc.id,
					title: doc.data().title || '', // Default to empty string if title is missing
					timestamp: doc.data().timestamp,
				}));

				setTodos({ data: todosArray });
			});

			// Cleanup listener on unmount or when query changes
			return () => unsubscribe();
		} catch (error) {
			console.error('Error fetching todos:', error);
		} finally {
			setLoading(false);
		}
	}, [prepareQuery]);

	const onCreate = useCallback((data) => {
		addDoc(todosRef, {
			...data,
			timestamp: serverTimestamp(),
		});
	}, []);

	const onDelete = useCallback((id) => {
		deleteDoc(todoRef(id));
	}, []);

	const onUpdate = useCallback((data) => {
		updateDoc(todoRef(data.id), data);
	}, []);

	return { todos, loading, onCreate, onDelete, onUpdate, query, setQuery };
}
