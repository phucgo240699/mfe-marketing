import ReactDOM from 'react-dom/client';

const mount = (el: Element) => {
  const root = ReactDOM.createRoot(el);

  import('./exposed/mfe').then(({ default: MFE }) => {
    root.render(<MFE />);
  });
};

// Isolation
const el = document.querySelector('#marketing-root');
if (el) {
  import('./exposed/main').then(({ default: Main }) => {
    const root = ReactDOM.createRoot(el);
    root.render(<Main />);
  });
}

// Export to global micro frontends world
export { mount };
