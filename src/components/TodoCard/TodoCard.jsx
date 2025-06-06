import PropTypes from 'prop-types';
import styles from './todoCard.module.css';
import { Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoCard = ({ todo, onUpdate, onDelete }) => (
	<Box className={styles.card}>
		<Box className={styles.cardContent}>
			<Box className={styles.cardTop}>
				<Typography variant="body1" className={styles.cardTitle}>
					N.{todo.id}
				</Typography>
				<Typography variant="body1">Todo Card</Typography>
			</Box>
			<Box className={styles.instrumentsBlock}>
				<EditIcon sx={{ mr: 2, cursor: 'pointer' }} onClick={onUpdate} />{' '}
				<DeleteIcon sx={{ cursor: 'pointer' }} onClick={onDelete} />
			</Box>
			<Typography variant="body1" className={styles.cardBottom}>
				{todo.title}
			</Typography>
		</Box>
	</Box>
);

TodoCard.propTypes = {
	todo: PropTypes.object,
	onUpdate: PropTypes.func,
	onDelete: PropTypes.func,
};

export default TodoCard;
