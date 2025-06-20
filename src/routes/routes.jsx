import { MainPage, UpdateTodo, NotFound } from '@/pages';
import { Navigate } from 'react-router-dom';

export const routes = [
	{ path: '/', element: <MainPage /> },
	{ path: '/todo/:id', element: <UpdateTodo /> },
	{ path: '*', element: <Navigate to="/404" replace /> },
	{ path: '/404', element: <NotFound /> },
];
