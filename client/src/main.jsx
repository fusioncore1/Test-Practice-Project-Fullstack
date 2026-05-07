// external libraries/packages/modules:
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

// internal libraries/packages/modules:
import './index.css';
import App from './App.jsx';
import Context from './components/ContextProvider/Context.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Context>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Context>
	</StrictMode>,
);