import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import Login from './components/Login';

import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
    <Router>
        <div>
          <Route path='/' component={App} />
          <Route exact path="/login" component={Login} />
        </div>
    </Router>,
    document.getElementById('root'))
registerServiceWorker();
