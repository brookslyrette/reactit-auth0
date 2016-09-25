import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import AuthService from './utils/AuthenticationService.js';

import App from './App';
import './index.css';
import Login from './components/Login.js';

import FrontPageContainer from './containers/FrontPageContainer.js';
import SubredditPageContainer from './containers/SubredditPageContainer.js';
import AuthenticationContainer from './containers/AuthenticationContainer.js';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { subreddit } from './reducers/redditReducer.js';

//these credentials are only for a one off demo.
const auth = new AuthService('q6KwAO8YwaF5YcJudVPAB0ZfKyKmF6qm', 'broonix.auth0.com');

//redirect to login if the user is not logged in.
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
}

//parse login token from Auth0
const parseAuthHash = (nextState, replace) => {
  auth.parseHash(nextState.location.hash);
}

const store = createStore(subreddit, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App} auth={auth} onEnter={parseAuthHash}>
        <Route component={AuthenticationContainer} auth={auth}>
          <Route path="/" component={FrontPageContainer} onEnter={requireAuth}/>
          <Route path="/r/:name" component={SubredditPageContainer} onEnter={requireAuth}/>
          <Route path="/login" component={Login} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
