// @todo: Темплейт карточки
const placesList = document.querySelector(".places__list"); // переменная для списка мест

function createCard(element, deleteCard) { // функция для создания карточки и управления DOM элементами

  const cardTemplate = document.querySelector("#card-template").content; // находим шаблон карточки
  const cardElement = cardTemplate.cloneNode(true); // клонируем шаблон
  const title = cardElement.querySelector(".card__title"); // находим заголовок
  const img = cardElement.querySelector(".card__image"); // находим изображение
  const deleteButton = cardElement.querySelector(".card__delete-button"); // находим кнопку удаления
  
  title.textContent = element.name; // устанавливаем заголовок
  
  img.src = element.link; // устанавливаем ссылку на изображение
  img.alt = element.name; // устанавливаем альтернативный текст для изображения
  
  deleteButton.addEventListener("click", deleteCard); // добавляем обработчик на кнопку удаления
  return cardElement; // возвращаем созданный элемент карточки
}

// функция удаления карточки
function deleteCard(event) {
  const card = event.target.closest(".card"); // находим родительскую карточку
  card.remove(); // удаляем карточку
}

// выводим карточки на экран
initialCards.forEach((card) => {
  const createdCard = createCard(card, deleteCard);
  placesList.append(createdCard);
});

// открытие попапа для редактирования профиля
const openButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup_type_edit');

openButton.addEventListener('click', function () {
  popup.style.display = 'block';
});

// закрытие попапа для редактирования профиля
const closeButton = popup.querySelector('.popup__close');
closeButton.addEventListener('click', function () {
  popup.style.display = 'none';
});

// открытие попапа для добавления новой карточки
const addButton = document.querySelector('.profile__add-button');
const popup_card = document.querySelector('.popup_type_new-card');

addButton.addEventListener('click', function () {
  popup_card.style.display = 'block';
});

// закрытие попапа для добавления новой карточки
const closePopup = popup_card.querySelector('.popup__close');
closePopup.addEventListener('click', function () {
  popup_card.style.display = 'none';
});
