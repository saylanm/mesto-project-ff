import { checkResponse } from '../utils/utils'

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
  headers: {
    authorization: '4b1fefa3-9f63-465e-b242-9eeac7bfd3bb',
    'Content-Type': 'application/json'
  }
}

function request(endpoint, options) {
  return fetch(`${config.baseUrl}${endpoint}`, options).then(checkResponse);
}

function getUserData() {
  return request('/users/me', {
    headers: config.headers
  });
}

function getInitialCards() {
  return request('/cards', {
    headers: config.headers
  });
}

function patchUserInfo(editProfileName, editProfileDescription) {
  return request('/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: editProfileName.value,
      about: editProfileDescription.value
    })
  });
}

function postNewCard(formNewPlaceInputName, formNewPlaceInputLink) {
  return request('/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: formNewPlaceInputName.value,
      link: formNewPlaceInputLink.value
    })
  });
}

function deleteCard(id) {
  return request(`/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

function likeCard(id) {
  return request(`/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers
  });
}

function deleteLike(id) {
  return request(`/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

function editAvatar(input) {
  return request('/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: input.value
    })
  });
}

export { getUserData, getInitialCards, patchUserInfo, postNewCard, deleteCard, likeCard, deleteLike, editAvatar };