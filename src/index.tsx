
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./Redux/store/store";


const rootElem = document.getElementById('root');

if (rootElem) {
    const root = ReactDOM.createRoot(rootElem);
    root.render(
        <BrowserRouter>
            <Provider store={store} >
                <App />
            </Provider>
        </BrowserRouter>
    );

}


