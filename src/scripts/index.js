// @todo: Темплейт карточки
const placesList = document.querySelector(".places__list"); // заводим переменную

function createCard(element, deleteCard) { // функция по добавлению карточки и поиска через DOM элементов

  const cardTemplate = document.querySelector("#card-template").content; // находим карточку temlate
  const cardElement = cardTemplate.cloneNode(true); //содержит ли карточка элемент
  const title = cardElement.querySelector(".card__title"); // находим описание
  const img = cardElement.querySelector(".card__image"); // находим картинку

  title.textContent = element.name;


  img.src = element.link;
  img.alt = element.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  
  deleteButton.addEventListener("click", deleteCard);
  return cardElement;
}

function deleteCard(event) { // фуникция по удалению карточки 
  const card = event.target.closest(".card");
  card.remove();
}

initialCards.forEach((element) => {
  placesList.append(createCard(element, deleteCard));
});

