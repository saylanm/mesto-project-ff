// @todo: Темплейт карточки
const placesList = document.querySelector(".places__list"); // заводим переменную

function AddCard(element, deleteCard) { // функция по добавлению карточки и поиска через DOM элементов

  const card_template = document.querySelector("#card-template").content; // находим карточку temlate
  const card_element = card_template.cloneNode(true); //содержит ли карточка элемент
  const title = card_element.querySelector(".card__title"); // находим описание
  const img = card_element.querySelector(".card__image"); // находим картинку

  title.textContent = element.name;

  img.src = element.link;
  img.alt = element.name;

  const delete_button = card_element.querySelector(".card__delete-button");
  
  delete_button.addEventListener("click", deleteCard);
  return card_element;
}

function deleteCard(event) { // фуникция по удалению карточки 
  const card = event.target.closest(".card");
  card.remove();
}

initialCards.forEach((element) => {
  placesList.append(AddCard(element, deleteCard));
});