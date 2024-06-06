import '../pages/index.css';
import { createCard, like } from '../scripts/cards.js';
import { openPopup, closePopup } from '../scripts/modal.js';
import { enableValidation, clearValidation } from '../scripts/validation.js';
import { getUserData, getInitialCards, patchUserInfo, postNewCard, deleteCard, likeCard, deleteLike, editAvatar } from '../scripts/api.js';
import { config } from '../scripts/validationConfig.js';
// находим эелементы DOM
const formEditProfile = document.forms['edit-profile'];
const formNewPlace = document.forms['new-place'];
const popups = document.querySelectorAll('.popup');
const cardList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const inputProfileName = formEditProfile.elements.name;
const inputProfileDescription = formEditProfile.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const imagePopup = document.querySelector('.popup_type_image');
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');
const forms = document.querySelectorAll('.popup__form');
const inputsFormEditProfile = Array.from(formEditProfile.querySelectorAll('.popup__input'));
const buttonFormEditProfile = formEditProfile.querySelector('.popup__button');
const inputsFormNewPlace = Array.from(formNewPlace.querySelectorAll('.popup__input'));
const buttonFormNewPlace = formNewPlace.querySelector('.popup__button');
const profileImage = document.querySelector('.profile__image');
const inputNameFormNewPlace = formNewPlace.elements['place-name'];
const inputLinkFormNewPlace = formNewPlace.elements.link;
const popupTypeQuestion = document.querySelector('.popup_type_question');
const popupTypeQuestionButton = document.querySelector('.popup_type_question .button');
const popupTypeNewAvatar = document.querySelector('.popup_type_new-avatar');
const avatar = document.querySelector('.profile__image');
const formEditAvatar = document.forms['edit-avatar'];
const inputFormEditAvatar = formEditAvatar.elements.link;
const buttonFormEditAvatar = formEditAvatar.querySelector('.popup__button');
let card;
let cardId;

// Добавить карточки
Promise.all([getUserData(), getInitialCards()])
.then((res) => {
  const [userData, cardsData] = res;
      cardsData.forEach((item) => {
        renderCard(item, userData._id, "append");
      })
      setProfileInfo(userData);
  })
  .catch((err) => console.log(err))

function setProfileInfo (userData) {
  profileImage.src = userData.avatar;
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
}

function renderCard(item, userId, method = "prepend") {
  const cardElement = createCard(item, userId, item.name, item.link, handleImageClick, handleDeleteButtonClick, handleLikeButton);
  cardList[ method ](cardElement);
}


function handleImageClick (evt) {
  if (evt.target.classList.contains('card__image')) {
    openPopup(imagePopup);
    image.src = evt.target.src;
    image.alt = evt.target.alt;
    caption.textContent = evt.target.alt;
  }
}

function handleLikeButton (id, evt, likeButton) {
  if(likeButton.classList.contains('card__like-button_is-active')) {
    deleteLike(id)
    .then((data) => {
      data.likes.length == 0 ? likeButton.dataset.after = "" : likeButton.dataset.after = data.likes.length;
      like(evt);
    })
    .catch((err) => console.log(err))
  } else {
    likeCard(id)
    .then((data) => {
      likeButton.dataset.after = data.likes.length;
      like(evt);
    })
    .catch((err) => console.log(err))
  }
}

function handleDeleteButtonClick (item, evt) {
  openPopup(popupTypeQuestion);
  card = evt.target.closest('.card');
  cardId = item._id;
}

function handleYesButtonClick () {
  deleteCard(cardId)
  .then(() => {
    card.remove();
    closePopup(popupTypeQuestion);
  })
  .catch((err) => console.log(err))
}

popupTypeQuestionButton.addEventListener('click', handleYesButtonClick);

// Открыть Форму "редактировать профиль"

profileEditButton.addEventListener('click', () => {
  openPopup(popupTypeEdit);
  clearValidation(config, inputsFormEditProfile, buttonFormEditProfile, formEditProfile);
  inputProfileName.value = profileTitle.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  // clearValidation очищает поля и переключает кнопку. После установки значений в поля
  // Для clearValidation они не видны и кнопка остается disabled=true. Есди поменять места
  // Очистятся инпуты. Далее костыль
});

// Сохранить изменения формы "редактировать профиль"

formEditProfile.addEventListener('submit', (evt) => handleFormEditProfile(evt));

// UX "сохранить"

function handleSaveButton (evt, button, buttonText = "Сохранение...") {
  evt.preventDefault();
  button.textContent = [ buttonText ];
}

function handleFormEditProfile (evt) {
  handleSaveButton(evt, buttonFormEditProfile);
  patchUserInfo(inputProfileName, inputProfileDescription)
  .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    closePopup(popupTypeEdit);
  })
  .catch((err) => console.log(err))
  .finally(() => {
    buttonFormEditProfile.textContent = 'Сохранить';
  })
}

// Открывае Форму "добавление карточки"

profileAddButton.addEventListener('click', () => {
  openPopup(popupTypeNewCard);
  clearValidation(config, inputsFormNewPlace, buttonFormNewPlace, formNewPlace);
});

// Добавляем новую карточку

formNewPlace.addEventListener('submit', (evt) => {
  handleFormNewPlace(evt);
});

function handleFormNewPlace (evt) {
  handleSaveButton(evt, buttonFormNewPlace);
  postNewCard(inputNameFormNewPlace, inputLinkFormNewPlace)
  .then((data) => {
    renderCard(data, data.owner._id)
    closePopup(popupTypeNewCard);
  })
  .catch((err) => console.log(err))
  .finally(() => {
    buttonFormNewPlace.textContent = 'Сохранить';
  })
}

// Изменяем аватар

avatar.addEventListener('click', handleAvatarClick);

function handleAvatarClick () {
  openPopup(popupTypeNewAvatar);
  clearValidation(config, [inputFormEditAvatar], buttonFormEditAvatar, formEditAvatar);
}

formEditAvatar.addEventListener('submit', handleFormEditAvatar)

function handleFormEditAvatar (evt) {
  handleSaveButton(evt, buttonFormEditAvatar);
  editAvatar(inputFormEditAvatar)
  .then((data) => {
    avatar.src = data.avatar;
    closePopup(popupTypeNewAvatar);
  })
  .catch((err) => console.log(err))
  .finally(() => {
    buttonFormEditAvatar.textContent = 'Сохранить';
  })
}

// Включаем валидацию

enableValidation(config, forms);

// Закрываем попапы

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
