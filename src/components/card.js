export { createCard, deleteCard, likeCard };
// Темплейт карточки
const template = document.querySelector("#card-template").content;

//Функция создания карточки
function createCard(cardElem, deleteCard, openImage, likeCard) {
  const cardElement = template.querySelector(".card").cloneNode(true);
  const delCardButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardElement.querySelector(".card__title").textContent = cardElem.name;
  cardImage.src = cardElem.link;
  cardImage.alt = cardElem.name;

  likeButton.addEventListener("click", likeCard);
  cardImage.addEventListener("click", function () {
    openImage(cardElem);
  });
  delCardButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });
  return cardElement;
}

//удаление карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

//Лайк карточки
function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
