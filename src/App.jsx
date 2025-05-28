import { useEffect, useState } from 'react';
import styles from './app.module.css';
import TodoCard from '@/components/TodoCard';

function App() {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadTodos = async () => {
			try {
				const response = await fetch(
					'https://jsonplaceholder.typicode.com/todos',
				);
				if (!response.ok) throw new Error('Failed to fetch todos');
				const data = await response.json();
				setTodos(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setTimeout(() => setLoading(false), 1500);
			}
		};

		loadTodos();
	}, []);

	return (
		<div className={styles.root}>
			{loading ? (
				<div className={styles.loader}></div>
			) : error ? (
				<p className={styles.error}>Error: {error}</p>
			) : (
				<div>
					<p className={styles.title}>Todo List</p>
					<div className={styles.todos}>
						{todos.map((todo) => (
							<TodoCard key={todo.id} todo={todo} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
