import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import { openPopup, closePopup } from "../components/modal.js";

const galeryList = document.querySelector(".places__list");

initialCards.forEach((cardElem) => {
  galeryList.append(createCard(cardElem, deleteCard, openImage, likeCard));
});

//Popup
const popupevt = document.querySelectorAll(".popup");
//const popupClose = document.querySelectorAll('.popup__close'); // кнопка закрытия редактирования профиля
const popapOpenCard = document.querySelector(".popup_type_image"); //модальное окно
const popupImage = popapOpenCard.querySelector(".popup__image"); //картинка
const imageCaption = popapOpenCard.querySelector(".popup__caption"); //подпись карточки
const popupEditButton = document.querySelector(".profile__edit-button"); // профиль редактирования
const popupEdit = document.querySelector(".popup_type_edit"); //  открытия попапа редактирования
const popupCardButton = document.querySelector(".profile__add-button"); // кнопка открытия добавлени карты
const popupCard = document.querySelector(".popup_type_new-card"); //попап добавления карты

// слушатель на редактирования профиля
popupEditButton.addEventListener("click", function () {
  openPopup(popupEdit);
  nameInputEdit.value = profileTitle.textContent;
  jobInputEdit.value = profileDescription.textContent;
});

//слушатель на добавления карты
popupCardButton.addEventListener("click", function () {
  openPopup(popupCard);
});

//Функция увеличения карточки
function openImage(cardElem) {
  openPopup(popapOpenCard);
  popupImage.src = cardElem.link;
  popupImage.alt = cardElem.name;
  imageCaption.textContent = cardElem.name;
}

// закрытие попапа
popupevt.forEach(function (popup) {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

// Находим форму в DOM
const formElementEdit = popupEdit.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInputEdit = formElementEdit.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInputEdit = formElementEdit.querySelector(
  ".popup__input_type_description"
); // Воспользуйтесь инструментом .querySelector()
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
//Функция формы редактирования профиля
function handleFormSubmitEdit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInputEdit.value;
  profileDescription.textContent = jobInputEdit.value;
  closePopup(popupEdit);
}

formElementEdit.addEventListener("submit", handleFormSubmitEdit);

//форма добавления карточки
const formAddCard = document.forms["new-place"];
const cardNameInput = formAddCard.elements["place-name"];
const cardUrlInput = formAddCard.elements.link;

function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const cardlist = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };
  galeryList.prepend(createCard(cardlist, deleteCard, openImage, likeCard));

  evt.target.reset();
  closePopup(popupCard);
}

formAddCard.addEventListener("submit", handleFormSubmitCard);
