import { ACTION_TYPE } from '@/actions';
import { CreateTodoModal } from '@/components/modals';
import { useDebounce } from '@/hooks/useDebounce';
import { selectFilters } from '@/selectors';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { Box, Button, TextField, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PageHeader = () => {
	const [search, setSearch] = useState('');
	const [open, setOpen] = useState(false);

	const filters = useSelector(selectFilters);
	const dispatch = useDispatch();

	const ordering = filters?.order === 'desc' ? 'asc' : 'desc';
	const tooltipTitle = `Sort by ${ordering.toUpperCase()}`;

	const sortByAlpha = () =>
		dispatch({
			type: ACTION_TYPE.SET_ALPHA_SORT,
			payload: { order: ordering, sort: 'title' },
		});

	const debouncedSearch = useDebounce((searchTerm) => {
		dispatch({ type: ACTION_TYPE.SET_SEARCH, payload: searchTerm });
	}, 1500);

	const onChange = (value) => {
		setSearch(value);
		debouncedSearch(value);
	};

	return (
		<>
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
							dispatch({ type: ACTION_TYPE.RESET_SEARCH });
						}}
					>
						Reset filters
					</Typography>
				</Box>
			</Box>

			<CreateTodoModal open={open} handleClose={() => setOpen(false)} />
		</>
	);
};

PageHeader.propTypes = {
	setOpen: PropTypes.func.isRequired,
};

export default PageHeader;
