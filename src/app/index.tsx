import { createRoot } from 'react-dom/client';

import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('pg-material-design-icons');
  const root = createRoot(container);
  root.render(<App />);
});
