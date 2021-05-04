import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';

import './index.css';
// import App from './App';
// import store from './redux/redux-store';
// import { Provider } from 'react-redux';
import SamuraiJSApp from './App';

ReactDOM.render(
    // <React.StrictMode>

    // </React.StrictMode>,
    // Вставить BrowserRouter обратно по завершению проекта - избежали двойных рендеров

    // <BrowserRouter>
    //     <Provider store={store}>
    //         <App />
    //     </Provider>
    // </BrowserRouter>,
    <SamuraiJSApp />,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
