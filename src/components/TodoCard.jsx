import styles from './todoCard.module.css';

const TodoCard = ({ todo }) => (
	<div className={styles.card}>
		<div className={styles.cardContent}>
			<div className={styles.cardTop}>
				<span className={styles.cardTitle}>N.{todo.id}</span>
				<p>Todo Card</p>
			</div>
			<div className={styles.cardBottom}>{todo.title}</div>
		</div>
	</div>
);

export default TodoCard;
