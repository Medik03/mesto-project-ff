import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import { openPopup, closePopup } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import { validationSettings } from "../components/validation.js";
import { getUserData, getInitialCards, addCardServer, getUserDataServer } from "../components/api.js";
const galeryList = document.querySelector(".places__list");

/*
initialCards.forEach((cardElem) => {
  galeryList.append(createCard(cardElem, deleteCard, openImage, likeCard));
});
*/
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
  clearValidation(formElementEdit,validationSettings);
  nameInputEdit.value = profileTitle.textContent;
  jobInputEdit.value = profileDescription.textContent;
});

//слушатель на добавления карты
popupCardButton.addEventListener("click", function () {
  openPopup(popupCard);
  clearValidation(formAddCard,validationSettings);
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
const jobInputEdit = formElementEdit.querySelector( ".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const ButtonFormEdit = popupEdit.querySelector(".popup__button");
//Функция формы редактирования профиля
/*function handleFormSubmitEdit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInputEdit.value;
  profileDescription.textContent = jobInputEdit.value;
  closePopup(popupEdit);
  
}
*/
function editProfileData(evt) {
  evt.preventDefault();

  let name = nameInputEdit.value;
  let job = jobInputEdit.value;
  saveButton(true, ButtonFormEdit);

  getUserDataServer(name, job)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupEdit);
      formElementEdit.reset();
    })
    .catch((err) => {
      console.log("роизошла ошибка при изменении информации профиля:", err);
    })
    .finally(() => {
      saveButton(false, ButtonFormEdit);
      formElementEdit.reset();
    });
}

formElementEdit.addEventListener("submit", editProfileData);


function saveButton (loader, button) {
  if (loader) {
    button.textContent = "Сохранение.....";
  } else if (!loader) {
    button.textContent = "Сохранить";
  }
};
//форма добавления карточки
const formAddCard = document.forms["new-place"];
const cardNameInput = formAddCard.elements["place-name"];
const cardUrlInput = formAddCard.elements.link;
const ButtonFormAddCard = formAddCard.querySelector(".popup__button");
/*
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
*/
function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const cardlist = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };

  saveButton(true, ButtonFormAddCard);
    addCardServer(cardlist)
  .then((res) => {
    const cardElement = createCard(res,deleteCard, openImage, likeCard,userId);
  galeryList.prepend(cardElement);
  })
  .catch((err) => {
    console.log("Произошла ошибка при добавлении карточки:", err);
  })
  .finally(() => {
    saveButton(false, ButtonFormAddCard);
    evt.target.reset();
    closePopup(popupCard);
  });
  

}
console.log(handleFormSubmitCard)


formAddCard.addEventListener("submit", handleFormSubmitCard);
//Валидация редактирование профиля



enableValidation(validationSettings);


//API 
let userId = "";
Promise.all([getUserData(), getInitialCards()])
.then(([userData]) => {
  /* Отображение моего имени и моей работы */
  userId = userData._id;
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  /*profileImage.setAttribute(
    "style",
    `background-image: url('${userData.avatar}')`
  )*/

  getInitialCards()
  .then(res => {
    res.forEach(item => {
      const cardElement = createCard(item,deleteCard, openImage, likeCard,userId);
      galeryList.append(cardElement);
    }); 
})
.catch((err) => {
  console.log("Error fetching user and cards data: ", err);
})
});
