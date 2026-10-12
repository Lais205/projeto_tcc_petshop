import { createRoot } from 'react-dom/client';
import AppView from './views/AppView.jsx';
import '../app/static/css/style.css';

createRoot(document.getElementById('root')).render(<AppView />);
