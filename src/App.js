import React, { Component } from 'react';
import { Link } from 'react-router'
import logo from './logo.svg';
import './App.css';

import DefaultRedditsContainer from './containers/DefaultRedditsContainer.js'

class App extends Component {

  constructor(props) {
    super(props);

    this.logout = () => this._logout();
  }

  _logout() {
    this.props.route.auth.logout();
    this.context.router.push('/login');
  }

  render() {
    return (
      <div className="App container-fluid">
        <div className="App-reddit-selector">
          <Link to="/">Front</Link> - <Link to="/r/all">All</Link> |
          <DefaultRedditsContainer />
          <div className="pull-xs-right">
            <a href="#" onClick={this.logout}>Logout</a>
          </div>
        </div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <strong>Reactit!</strong> An Example ReactJs Reddit front-end
        </div>
        {this.props.children}
      </div>
    )
  }
}

App.contextTypes =  {
  router: React.PropTypes.object
}

export default App;
