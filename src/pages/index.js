import '../pages/index.css';
import { createCard, like } from '../scripts/cards.js';
import { openPopup, closePopup } from '../scripts/modal.js';
import { enableValidation, clearValidation } from '../scripts/validation.js';
import { getUserData, getInitialCards, patchUserInfo, postNewCard, deleteCard, likeCard, deleteLike, editAvatar } from '../scripts/api.js';
import { config } from '../scripts/validationConfig.js';

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
const forms = document.querySelectorAll('.popup__form');
const formEditProfileInputs = Array.from(formEditProfile.querySelectorAll('.popup__input'));
const formEditProfileButton = formEditProfile.querySelector('.popup__button');
const formNewPlaceInputs = Array.from(formNewPlace.querySelectorAll('.popup__input'));
const formNewPlaceButton = formNewPlace.querySelector('.popup__button');
const profileImage = document.querySelector('.profile__image');
const formNewPlaceInputName = formNewPlace.elements['place-name'];
const formNewPlaceInputLink = formNewPlace.elements.link;
const popupTypeQuestion = document.querySelector('.popup_type_question');
const popupTypeQuestionButton = document.querySelector('.popup_type_question .button');
const popupTypeNewAvatar = document.querySelector('.popup_type_new-avatar');
const avatar = document.querySelector('.profile__image');
const formEditAvatar = document.forms['edit-avatar'];
const formEditAvatarInput = formEditAvatar.elements.link;
const formEditAvatarButton = formEditAvatar.querySelector('.popup__button')

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
  const cardElement = createCard(item.name, item.link, handleImageClick);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  if(!(item.owner._id === userId)) {
    deleteButton.setAttribute('style', 'display: none');
  }

  if(item.likes.length > 0) {
    likeButton.dataset.after = item.likes.length;
  }

  if(isLiked(item, userId)) {
    likeButton.classList.add('card__like-button_is-active')
  }

  deleteButton.addEventListener('click', (evt) => handleDeleteButtonClick(item, userId, evt));
  likeButton.addEventListener('click', (evt) => handleLikeButton(item._id, evt, likeButton))

  cardList[ method ](cardElement);
}

// Обработчики клика для карточки

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

function isLiked (item, userId) {
 return item.likes.some((element) => {
  return element._id === userId
 })
}

function handleDeleteButtonClick (item, userId, evt) {
  openPopup(popupTypeQuestion);
  popupTypeQuestionButton.addEventListener('click', () => handleYesButtonClick(item, userId, evt))
}

// я не знал, что это доп задание... 

function handleYesButtonClick (item, userId, evt) {
  if((item.owner._id === userId)) {
    deleteCard(item._id)
      .then(() => {
        const card = evt.target.closest('.card');
        card.remove();
        popupTypeQuestionButton.removeEventListener('click', () => handleYesButtonClick(item, userId, evt));
        closePopup(popupTypeQuestion);
      })
      .catch((err) => console.log(err))
  }
}

// Открыть Форму "редактировать профиль"

editButton.addEventListener('click', () => {
  openPopup(popupTypeEdit);
  clearValidation(config, formEditProfileInputs, formEditProfileButton, formEditProfile);
  editProfileName.value = profileTitle.textContent;
  editProfileDescription.value = profileDescription.textContent;
  // clearValidation очищает поля и переключает кнопку. После установки значений в поля
  // Для clearValidation они не видны и кнопка остается disabled=true. Есди поменять места
  // Очистятся инпуты. Далее костыль
  formEditProfileButton.disabled = false;
  formEditProfileButton.classList.remove('submit_inactive');
});

// Сохранить изменения формы "редактировать профиль"

formEditProfile.addEventListener('submit', (evt) => handleFormEditProfile(evt));

// UX "сохранить"

function handleSaveButton (evt, button) {
  evt.preventDefault();
  button.innerHTML = 'Сохранение<span>.</span><span>.</span><span>.</span>'
  const dots = button.querySelectorAll('span');
  dots.forEach((item) => {
    item.style.display = 'inline-block';
  })
}

function handleFormEditProfile (evt) {
  handleSaveButton(evt, formEditProfileButton);
  patchUserInfo(editProfileName, editProfileDescription)
  .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    formEditProfileButton.textContent = 'Сохранить';
    closePopup(popupTypeEdit);
  })
  .catch((err) => console.log(err))
}

// Открыть Форму "добавить карточку"

profileAddButton.addEventListener('click', () => {
  openPopup(popupTypeNewCard);
  clearValidation(config, formNewPlaceInputs, formNewPlaceButton, formNewPlace);
});

// Добавить новую карточку

formNewPlace.addEventListener('submit', (evt) => {
  handleFormNewPlace(evt);
});

function handleFormNewPlace (evt) {
  handleSaveButton(evt, formNewPlaceButton);
  postNewCard(formNewPlaceInputName, formNewPlaceInputLink)
  .then((data) => {
    renderCard(data, data.owner._id)
    formNewPlaceButton.textContent = 'Сохранить';
    closePopup(popupTypeNewCard);
  })
  .catch((err) => console.log(err))
}

// Изменить аватар

avatar.addEventListener('click', handleAvatarClick);

function handleAvatarClick () {
  openPopup(popupTypeNewAvatar);
  clearValidation(config, [formEditAvatarInput], formEditAvatarButton, formEditAvatar);
}

formEditAvatar.addEventListener('submit', handleFormEditAvatar)

function handleFormEditAvatar (evt) {
  handleSaveButton(evt, formEditAvatarButton);
  editAvatar(formEditAvatarInput)
  .then((data) => {
    avatar.src = data.avatar;
    formEditAvatarButton.textContent = 'Сохранить';
    closePopup(popupTypeNewAvatar);
  })
  .catch((err) => console.log(err))
}

// Включить валидацию

enableValidation(config, forms);

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

// Токен: 2e1b0b74-43cb-43a1-b169-23f9e934c10d
// Идентификатор группы: wff-cohort-14