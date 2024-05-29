const cardTemplate = document.querySelector('#card-template');

function createCard(name, link, deleteCard, handleImageClick, like) {
  const listItemCopy = cardTemplate.content.cloneNode(true);
  const deleteButton = listItemCopy.querySelector('.card__delete-button');
  const cardImage = listItemCopy.querySelector('.card__image');
  const likeButton = listItemCopy.querySelector('.card__like-button');
  const cardTitle = listItemCopy.querySelector('.card__title');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  deleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', handleImageClick);
  likeButton.addEventListener('click', like);
  
  return listItemCopy
}

function deleteCard (evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

function like (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export {createCard, deleteCard, like}