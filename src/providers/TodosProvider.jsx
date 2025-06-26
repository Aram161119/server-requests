import { TodosContext } from '@/context/context';
import { defaultFilters } from '@/static/staticData';
import { useTodos } from '@/hooks';
import PropTypes from 'prop-types';

export const TodosProvider = ({ children }) => {
	const data = useTodos(defaultFilters);

	return <TodosContext value={{ ...data }}>{children}</TodosContext>;
};

TodosProvider.propTypes = {
	children: PropTypes.node,
};
