// eslint-disable-next-line no-shadow
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

/* eslint-disable no-param-reassign */

class ApiService {
  constructor({ name, host, uuid }) {
    this.name = name;
    this.host = host;
    this.uuid = uuid;
  }

  async request(url, method = 'GET', body = null, headers = {}) {
    headers['X-Service-UUID'] = this.uuid;
    headers['X-Service-Name'] = this.name;
    if (body) {
      body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${this.host}${url}`, { method, body, headers });
    const data = await response.json();

    return { status: response.status, data };
  }
}

module.exports = ApiService;
