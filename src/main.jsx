import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider, TodosProvider } from '@/providers';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<NotificationProvider>
			<BrowserRouter>
				<TodosProvider>
					<App />
				</TodosProvider>
			</BrowserRouter>
		</NotificationProvider>
	</StrictMode>,
);
