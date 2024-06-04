const cardTemplate = document.querySelector('#card-template');

function createCard(name, link, handleImageClick) {
  const listItemCopy = cardTemplate.content.cloneNode(true);
  const cardImage = listItemCopy.querySelector('.card__image');
  const cardTitle = listItemCopy.querySelector('.card__title');
  
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener('click', handleImageClick);

  return listItemCopy
}

function like (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export {createCard, like}