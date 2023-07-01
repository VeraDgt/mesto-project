function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } 
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
};

function request(url, options) {
  return fetch(url, options).then(checkResponse);
};

export { renderLoading, request }