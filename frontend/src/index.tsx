import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { guitars } from './mocks/mock';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App guitars={guitars} />
  </React.StrictMode>,
);
