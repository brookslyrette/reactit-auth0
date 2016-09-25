import React, { Component, PropTypes } from 'react';
import AuthService from '../utils/AuthenticationService.js';

export default class Login extends Component {

  static propTypes = {
    location: PropTypes.object,
    auth: PropTypes.instanceOf(AuthService),
  }

  componentDidMount() {
    const auth = this.props.auth;
    if (!auth.loggedIn()) {
      auth.login();
    }
  }

  //empty div since the auth0 wrapper displays the login
  render() {
      return (
        <div>
        </div>
      )
    }
}

Login.contextTypes =  {
  router: React.PropTypes.object
}
