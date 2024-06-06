import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import { openPopup, closePopup } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  getUserData,
  getInitialCards,
  addCardServer,
  getUserDataServer,
  avatarProfileServer,
} from "../components/api.js";
const galeryList = document.querySelector(".places__list");

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

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
  clearValidation(formElementEdit, validationSettings);
  nameInputEdit.value = profileTitle.textContent;
  jobInputEdit.value = profileDescription.textContent;
});

//слушатель на добавления карты
popupCardButton.addEventListener("click", function () {
  openPopup(popupCard);
  clearValidation(formAddCard, validationSettings);
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
const buttonFormEdit = popupEdit.querySelector(".popup__button");
//Функция формы редактирования профиля
function editProfileData(evt) {
  evt.preventDefault();

  let name = nameInputEdit.value;
  let job = jobInputEdit.value;
  saveButton(true, buttonFormEdit);

  getUserDataServer(name, job)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupEdit);
      formElementEdit.reset();
    })
    .catch((err) => {
      console.log("Произошла ошибка при изменении информации профиля:", err);
    })
    .finally(() => {
      saveButton(false, buttonFormEdit);
    });
}

formElementEdit.addEventListener("submit", editProfileData);

//форма добавления карточки
const formAddCard = document.forms["new-place"];
const cardNameInput = formAddCard.elements["place-name"];
const cardUrlInput = formAddCard.elements.link;
const buttonFormAddCard = formAddCard.querySelector(".popup__button");

function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const cardlist = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };

  saveButton(true, buttonFormAddCard);
  addCardServer(cardlist)
    .then((res) => {
      const cardElement = createCard(
        res,
        deleteCard,
        openImage,
        likeCard,
        userId
      );
      galeryList.prepend(cardElement);
    })
    .catch((err) => {
      console.log("Произошла ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      saveButton(false, buttonFormAddCard);
      closePopup(popupCard);
    });
}

formAddCard.addEventListener("submit", handleFormSubmitCard);

//Функция редактирования аватара
const popupAvatar = document.querySelector(".popup_type_avatar");
const profileImageAvatar = document.querySelector(".profile__image");
// слушатель на редактирования аватара
profileImageAvatar.addEventListener("click", function () {
  openPopup(popupAvatar);
  clearValidation(formAvatarProfile, validationSettings);
});

const formAvatarProfile = popupAvatar.querySelector(".popup__form");
const avatarInput = formAvatarProfile.querySelector(".popup__input_type_url");
const buttonSaveAvatar = formAvatarProfile.querySelector(".popup__button");

function editProfileAvatar(evt) {
  evt.preventDefault();
  let avatar = avatarInput.value;
  saveButton(true, buttonSaveAvatar);
  avatarProfileServer(avatar)
    .then((data) => {
      profileImageAvatar.style.backgroundImage = `url(${data.avatar})`;
      closePopup(popupAvatar);
      formAvatarProfile.reset();
    })
    .catch((err) => {
      console.log("Произошла ошибка при изменении аватара профиля:", err);
    })
    .finally(() => {
      saveButton(false, buttonSaveAvatar);
    });
}

formAvatarProfile.addEventListener("submit", editProfileAvatar);

// Включаем валидацию
enableValidation(validationSettings);

function saveButton(loader, button) {
  if (loader) {
    button.textContent = "Сохранение.....";
  } else if (!loader) {
    button.textContent = "Сохранить";
  }
}

//API
let userId = "";
Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cardsArray]) => {
    /* Отображение моего имени и моей работы */
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImageAvatar.setAttribute(
      "style",
      `background-image: url('${userData.avatar}')`
    );

    cardsArray.forEach((item) => {
      const cardElement = createCard(
        item,
        deleteCard,
        openImage,
        likeCard,
        userId
      );
      galeryList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log("Ошибка при получении данных пользователя и карт:", err);
  });
