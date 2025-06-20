import { Box } from '@mui/material';
import styles from './loader.module.css';

export default function Loader() {
	return (
		<Box
			height={620}
			alignItems={'center'}
			justifyContent={'center'}
			display={'flex'}
		>
			<Box className={styles.loader} />
		</Box>
	);
}
