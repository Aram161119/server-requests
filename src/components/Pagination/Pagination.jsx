import { Pagination as MuiPagination, Box } from '@mui/material';
import PropTypes from 'prop-types';

const Pagination = ({ onChange, page, pageTotalCount }) => {
	const handleChange = (event, value) => {
		if (value === page) return;
		onChange(value);
	};

	return (
		<Box display={'flex'} justifyContent={'center'} pt={6} pb={6}>
			<MuiPagination
				count={pageTotalCount}
				color="primary"
				size="large"
				showFirstButton
				showLastButton
				page={page}
				onChange={handleChange}
			/>
			;
		</Box>
	);
};

Pagination.propTypes = {
	onChange: PropTypes.func,
	page: PropTypes.number,
	pageTotalCount: PropTypes.number,
};

export default Pagination;
