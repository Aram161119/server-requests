import { Button, Typography, Box, TextField, Tooltip } from '@mui/material';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { defaultFilters } from '@/static/staticData';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

const PageHeader = ({ setOpen, setQuery, query }) => {
	const [search, setSearch] = useState('');

	const ordering = query?.order === 'desc' ? 'asc' : 'desc';
	const tooltipTitle = `Sort by ${ordering.toUpperCase()}`;

	const sortByAlpha = () =>
		setQuery({
			...query,
			order: ordering,
			sort: 'title',
		});

	const debouncedSearch = useDebounce((searchTerm) => {
		setQuery({ ...query, filter: searchTerm });
	}, 1500);

	const onChange = (value) => {
		setSearch(value);
		debouncedSearch(value);
	};

	return (
		<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
			<Button variant="contained" onClick={() => setOpen(true)}>
				Add new todo
			</Button>
			<Box display={'flex'} alignItems={'center'}>
				<TextField
					sx={{ ml: 3, mr: 1, width: 520 }}
					id="outlined-basic"
					label="Search by title"
					type="text"
					variant="outlined"
					fontWeight={700}
					value={search}
					onChange={(e) => onChange(e.target.value)}
				/>
				<Tooltip title={tooltipTitle} arrow>
					<SortByAlphaIcon
						onClick={() => sortByAlpha()}
						sx={{ cursor: 'pointer' }}
					/>
				</Tooltip>
				<Typography
					variant="subtitle1"
					color="primary"
					sx={{ cursor: 'pointer', ml: 2 }}
					onClick={() => {
						setSearch('');
						setQuery(defaultFilters);
					}}
				>
					Reset filters
				</Typography>
			</Box>
		</Box>
	);
};

PageHeader.propTypes = {
	setOpen: PropTypes.func.isRequired,
	setQuery: PropTypes.func.isRequired,
	query: PropTypes.object.isRequired,
};

export default PageHeader;
