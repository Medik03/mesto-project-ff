const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-14',
    headers: {
        'Authorization': '5b8f1500-ddea-466b-ab6b-b4f5e144f622', 
        'Content-Type': 'application/json'
    }
  };
  
  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    else {
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }  
  
  };
  
  //функция получения данных пользователя
  function getUserData () {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    })
    .then(checkResponse)
  };
  
  //функция получения карточек
  function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    })
    .then(checkResponse)
  };
  //функция добавления карточки
  function addCardServer (name,link) {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(name,link),
    })
    .then(checkResponse)
  };
  
  function getUserDataServer (name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      }),
    })
    .then(checkResponse)
  };

  
function likeCardApi (cardId) {
    return fetch(`${config.baseUrl}/cards//likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
    })
    .then(checkResponse)
  };
  
  function deleteLikeCardApi (cardId) {
    return fetch(`${config.baseUrl}/cards//likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(checkResponse)
  };
  
   function deleteCardApi (cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(checkResponse)
  };
  
  function avatarProfileServer (avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatar
      }),
    })
    .then(checkResponse)
  };

  export {getUserData, getInitialCards, addCardServer, getUserDataServer, likeCardApi, deleteLikeCardApi, deleteCardApi};  

