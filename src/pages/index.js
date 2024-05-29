// Спасибо огромное за Ваши подробные комментарии! Стало намного понятнее!

import '../pages/index.css';
import { createCard, deleteCard, like } from '../scripts/cards.js';
import { openPopup, closePopup } from '../scripts/modal.js';
import { initialCards } from '../scripts/initialCards.js';

const formEditProfile = document.forms['edit-profile'];
const formNewPlace = document.forms['new-place'];
const popups = document.querySelectorAll('.popup');
const cardList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const editProfileName = formEditProfile.elements.name;
const editProfileDescription = formEditProfile.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const imagePopup = document.querySelector('.popup_type_image');
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');


// Добавить карточки

function handleImageClick (evt) {
  if (evt.target.classList.contains('card__image')) {
    openPopup(imagePopup);
    image.src = evt.target.src;
    image.alt = evt.target.alt;
    caption.textContent = evt.target.alt;
  }
}

function renderCard(item, method = "prepend") {

  const cardElement = createCard(item.name, item.link, deleteCard, handleImageClick, like);

  cardList[ method ](cardElement);
}

initialCards.forEach(function (item) {
  renderCard(item, "append");
}); 

// Открыть Форму "редактировать профиль"

editButton.addEventListener('click', () => {
  openPopup(popupTypeEdit);
  
  // Значение формы по умолчанию
  
  editProfileName.value = profileTitle.textContent;
  editProfileDescription.value = profileDescription.textContent;
});

// Закрыть попапы

popups.forEach((item) => {
  item.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(item);
    }

    else if (evt.target.classList.contains('popup__close')) {
      closePopup(item);
    }
  })
})

// Сохранить изменения формы "редактировать профиль"

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = editProfileName.value;
  profileDescription.textContent = editProfileDescription.value;
  closePopup(popupTypeEdit);
}

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

// Открыть Форму "добавить карточку"

profileAddButton.addEventListener('click', () => openPopup(popupTypeNewCard));

// Добавить новую карточку

function addNewCard (evt) {
  evt.preventDefault();
  const inputPlace = formNewPlace.elements['place-name'].value
  const inputLink = formNewPlace.elements.link.value;
  const item = {
    name: inputPlace,
    link: inputLink
  }
  renderCard(item);
  closePopup(popupTypeNewCard);
  evt.target.reset();
}

formNewPlace.addEventListener('submit', addNewCard);


// Новая карточка

// function addNewCard (evt, popup, closePopup) {
//   evt.preventDefault();
//   const formNewPlace = document.forms['new-place'];
//   const inputPlace = formNewPlace.elements['place-name'].value
//   const inputLink = formNewPlace.elements.link.value;
//   cardList.prepend(createCard(inputPlace, inputLink, deleteCard, handleImageClick, like));
//   closePopup(popup);
//   evt.target.reset();
// }