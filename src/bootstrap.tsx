import App from './App';
import ReactDOM from 'react-dom/client';

const mount = (el: Element) => {
  const root = ReactDOM.createRoot(el);

  root.render(<App />);
};

// Isolation
const el = document.querySelector('#marketing-root');
if (el) {
  mount(el);
}

// Export to global micro frontends world
export { mount };
