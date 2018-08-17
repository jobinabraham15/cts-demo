import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './pages/app/App.component';
import 'index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
