import { ACTION_TYPE } from '@/actions';
import { selectFilters } from '@/selectors';
import { Box, Pagination as MuiPagination } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

const Pagination = ({ pageTotalCount }) => {
	const filters = useSelector(selectFilters);
	const dispatch = useDispatch();

	const page = filters.page;

	const handleChange = (event, value) => {
		if (value === page) return;
		dispatch({ type: ACTION_TYPE.SET_PAGE, payload: value });
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
	pageTotalCount: PropTypes.number,
};

export default Pagination;
