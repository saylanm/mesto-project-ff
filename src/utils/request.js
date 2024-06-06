import { checkResponse } from './checkResponse';

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}
