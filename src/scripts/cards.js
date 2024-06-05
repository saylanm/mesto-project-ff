const cardTemplate = document.querySelector('#card-template');

function createCard(item, userId, name, link, handleImageClick, handleDeleteButtonClick, handleLikeButton) {
  const listItemCopy = cardTemplate.content.cloneNode(true);
  const cardImage = listItemCopy.querySelector('.card__image');
  const cardTitle = listItemCopy.querySelector('.card__title');
  const deleteButton = listItemCopy.querySelector('.card__delete-button')
  const likeButton = listItemCopy.querySelector('.card__like-button');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  if(!(item.owner._id === userId)) {
    deleteButton.setAttribute('style', 'display: none');
  }

  if(item.likes.length > 0) {
    likeButton.dataset.after = item.likes.length;
  }

  if(isLiked(item, userId)) {
    likeButton.classList.add('card__like-button_is-active')
  }

  cardImage.addEventListener('click', handleImageClick);
  deleteButton.addEventListener('click', (evt) => handleDeleteButtonClick(item, evt));
  likeButton.addEventListener('click', (evt) => handleLikeButton(item._id, evt, likeButton));

  return listItemCopy
}

function like (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function isLiked (item, userId) {
  return item.likes.some((element) => {
   return element._id === userId
  })
 }

export {createCard, like}