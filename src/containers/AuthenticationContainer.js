import React, { Component } from 'react';

export default class AuthenticationContainer extends Component {

  render() {
      return React.cloneElement(this.props.children, {
        auth: this.props.route.auth,
      })
  }
}
