/* global Headers, fetch */

const { API_ROOT } = process.env;

export function callApi(endpoint, body, method = 'GET') {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  const params = {
    method,
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };

  if (['POST', 'PATCH', 'PUT'].includes(method)) {
    const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
    params.body = bodyStr;
  }

  return fetch(fullUrl, params)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    });
}

export function apiCallCreator(method, endpoint, successHandler, errorHandler) {
  return (body) => {
    return callApi(endpoint, body, method).then(successHandler, errorHandler);
  };
}

export const apiGetCreator = apiCallCreator.bind(this, 'GET');
export const apiPostCreator = apiCallCreator.bind(this, 'POST');
