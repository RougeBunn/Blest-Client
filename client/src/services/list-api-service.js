import TokenService from '../services/token-service';
import config from '../config';

const ListApiService = {
  getUserWithBlessings(userId) {
    return fetch(`${config.API_ENDPOINT}/users/${userId}`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getUserPage(userId) {
    return fetch(`${config.API_ENDPOINT}/userpage/${userId}`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getUserBlessings(userId) {
    return fetch(`${config.API_ENDPOINT}/userpage/${userId}/blesspage`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  addBlessing(blessing) {
    return fetch(`${config.API_ENDPOINT}/blessings`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(blessing)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  deleteBlessing(id) {
    return fetch(`${config.API_ENDPOINT}/blessings/${id}`, {
      method: 'DELETE',
      authorization: `Bearer ${TokenService.getAuthToken()}`
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  postBlessing(blessId, text) {
    return fetch(`${config.API_ENDPOINT}/blesspage`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        bless_id: blessId,
        text
      })
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default ListApiService;
