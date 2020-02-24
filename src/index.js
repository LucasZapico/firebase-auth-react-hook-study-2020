import React from 'react';
import ReactDOM from 'react-dom';
import './assets/sass/styles.scss';
import App from './components/App/Index';
import * as serviceWorker from './serviceWorker';
import { FirebaseProvider } from './components/Firebase/index.js';
import {
  AuthProvider,
  ItemsProvider,
  SelectedItemProvider,
} from './context/index';

ReactDOM.render(
  <FirebaseProvider>
    <AuthProvider>
      <ItemsProvider>
        <SelectedItemProvider>
          <App />
        </SelectedItemProvider>
      </ItemsProvider>
    </AuthProvider>
  </FirebaseProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
