export { openPopup, closePopup };

// функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
}

// функция закрытия X
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEsc);
}

//ESC
function closeEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_is-opened");
    closePopup(popupOpened);
  }
}

export const setPopupOpenEventListener = (openButton, callBack) => {
  openButton.addEventListener("click", () => {
    handleOpenModal(popupNode);
    clearValidation(popupEdit, validationSettings);
    clearValidation(popupNewCard, validationSettings);
    if (callBack) {
      callBack();
    }
  });
};
