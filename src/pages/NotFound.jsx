import { Box, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function NotFound() {
	return (
		<Box>
			<Box sx={{ textAlign: 'center', paddingTop: '210px', color: '#CDD4DE' }}>
				<Typography
					variant="h1"
					sx={{ fontWeight: 900, fontSize: '165px', opacity: 0.6 }}
				>
					404
				</Typography>
				<Typography
					variant="h4"
					sx={{ fontWeight: 700, fontSize: '34px', opacity: 0.9 }}
				>
					Page not found
				</Typography>
				<Typography
					sx={{
						fontWeight: 300,
						fontSize: '14px',
						opacity: 0.7,
						marginBottom: '140px',
					}}
				>
					I tried to catch some fog, but I mist.
				</Typography>
				<Button
					component={NavLink}
					to="/"
					replace={true}
					variant="outlined"
					sx={{ textTransform: 'uppercase', fontSize: '12px', opacity: 0.6 }}
				>
					Back to home
				</Button>
			</Box>
		</Box>
	);
}
