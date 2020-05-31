import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './pages/homepage.css';
import App from './App';
import store from './config/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
const app =
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>

ReactDOM.render(app, document.getElementById('root'));
