import { useState } from 'react';
import { Pagination as MuiPagination, Box } from '@mui/material';
import PropTypes from 'prop-types';

const Pagination = ({ query, setQuery, pageTotalCount }) => {
	const [page, setPage] = useState(query.page);

	const handleChange = (event, value) => {
		if (value === page) return;
		setQuery({ ...query, page: value });
		setPage(value);
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
	query: PropTypes.object,
	setQuery: PropTypes.func,
	pageTotalCount: PropTypes.number,
};

export default Pagination;
