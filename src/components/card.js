export { createCard, deleteCard, likeCard };
import {
  deleteCardApi,
  deleteLikeCardApi,
  likeCardApi,
} from "../components/api.js";
// Темплейт карточки
const template = document.querySelector("#card-template").content;

//Функция создания карточки
function createCard(cardElem, deleteCard, openImage, likeCard, userId) {
  const cardElement = template.querySelector(".card").cloneNode(true);
  const delCardButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".like");
  cardElement.querySelector(".card__title").textContent = cardElem.name;
  cardImage.src = cardElem.link;
  cardImage.alt = cardElem.name;
  likeCounter.textContent = cardElem.likes.length;
  if (cardElem.owner._id !== userId) {
    delCardButton.classList.add("card__delete-button-hidden");
  } else {
    delCardButton.classList.remove("card__delete-button-hidden");
  }

  const likeCardId = cardElem.likes.some(function (likes) {
    return likes._id === userId;
  });

  if (likeCardId) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  likeButton.addEventListener("click", function (event) {
    likeCard(event, cardElem._id, likeCounter);
  });
  cardImage.addEventListener("click", function () {
    openImage(cardElem);
  });

  delCardButton.addEventListener("click", function () {
    deleteCard(cardElement, cardElem._id);
  });
  return cardElement;
}

//удаление карточки
function deleteCard(cardElement, cardId) {
  deleteCardApi(cardId)
    .then((res) => {
      cardElement.remove();
      console.log("карточка удалена:", res);
    })
    .catch((err) => {
      console.log("Ошибка при удалении карточки: ", err);
    });
}

// Функция лайка
function likeCard(event, cardId, likeCounter) {
  const buttonLikeCard = event.target.classList.contains("card__like-button");
  const likeActiv = event.target.classList.contains(
    "card__like-button_is-active"
  );
  if (buttonLikeCard && !likeActiv) {
    event.target.classList.toggle("card__like-button_is-active");
    likeCardApi(cardId)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error(`Произошла ошибка при постановке лайка:`, err);
        event.target.classList.remove("card__like-button_is-active");
      });
  } else if (buttonLikeCard && likeActiv) {
    event.target.classList.remove("card__like-button_is-active");
    deleteLikeCardApi(cardId)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error(`Произошла ошибка при удаления лайка:`, err);
        event.target.classList.add("card__like-button_is-active");
      });
  }
}
