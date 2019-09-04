import config from '../config';

const TokenService = {
  saveAuthToken(token) {
    //console.info('saving the auth token', token);
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },
  clearAuthToken() {
    //console.info('clearing the auth token');
    window.localStorage.removeItem(config.TOKEN_KEY);
  },
  hasAuthToken() {
    //console.info('has the auth token', TokenService.getAuthToken());
    return !!TokenService.getAuthToken();
  },
  makeBasicAuthToken(userName, password) {
    console.info('making the auth token');
    return window.btoa(`${userName}:${password}`);
  }
};

export default TokenService;
