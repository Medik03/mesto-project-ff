// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const template = document.querySelector('#card-template').content;
const galeryList = document.querySelector('.places__list');

function createCard (cardElem, deleteCard) {
    
    const cardElement = template.querySelector('.card').cloneNode(true);
    const delCardButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__title').textContent = cardElem.name;
    cardElement.querySelector('.card__image').src = cardElem.link;
    cardElement.querySelector('.card__image').alt = cardElem.name;
    delCardButton.addEventListener('click', function() {
        deleteCard(cardElement)
    }) ; 
    return cardElement;
}
function deleteCard(cardElement) {
    cardElement.closest('.card').remove();
}
  
function addCard(cardElement) {
   galeryList.append(cardElement);
  };

 
initialCards.forEach((cardElem) => {
    galeryList.append(createCard(cardElem, deleteCard))
})