import Auth0Lock from 'auth0-lock';
import Auth0 from 'auth0-js';

export default class AuthService {

  constructor(clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {
      redirectUrl: '/',
    });

    this.auth0 = new Auth0({
      clientID: clientId,
      domain: domain,
      responseType: 'token'
    });

    this.lock.on('authenticated', this._doAuthentication.bind(this));
    this.login = this.login.bind(this);
  }

  _doAuthentication(authResult){
    this.setToken(authResult.idToken);
  }

  login() {
    this.lock.show();
  }

  loggedIn(){
    return !!this.getToken();
  }

  setToken(idToken){
    localStorage.setItem('id_token', idToken);
  }

  getToken(){
    return localStorage.getItem('id_token');
  }

  logout(){
    localStorage.removeItem('id_token');
  }

  parseHash(hash){
    const authResult = this.auth0.parseHash(hash);
    if (authResult && authResult.idToken) {
      this.setToken(authResult.idToken);
    }
  }
}
