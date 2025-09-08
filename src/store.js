import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { filtersReducer, loadingReducer, todosReducer } from './reducers';

const reducer = combineReducers({
	todos: todosReducer,
	filters: filtersReducer,
	loading: loadingReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
