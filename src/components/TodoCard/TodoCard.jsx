import PropTypes from 'prop-types';
import styles from './todoCard.module.css';
import { Typography, Box } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';

const TodoCard = ({ todo }) => {
	const navigate = useNavigate();

	const goToUpdate = () => navigate(`/todo/${todo.id}`);

	return (
		<Box className={styles.card}>
			<Box className={styles.cardContent}>
				<Box className={styles.cardTop}>
					<Typography variant="body1" className={styles.cardTitle}>
						N.{todo.id}
					</Typography>
					<Typography variant="body1">Todo Card</Typography>
				</Box>
				<Box className={styles.instrumentsBlock} onClick={goToUpdate}>
					<Typography
						cursor={'pointer'}
						variant="body1"
						fontFamily={'cursive'}
						mr={1}
					>
						Learn more
					</Typography>
					<MoreHorizIcon sx={{ cursor: 'pointer', fontSize: 30 }} />
				</Box>
				<Typography variant="body1" className={styles.cardBottom}>
					{todo.title}
				</Typography>
			</Box>
		</Box>
	);
};

TodoCard.propTypes = {
	todo: PropTypes.object,
};

export default TodoCard;
