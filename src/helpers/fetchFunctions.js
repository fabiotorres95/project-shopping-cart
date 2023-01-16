const showLoadingScreen = () => {
  const message = document.createElement('div');
  message.className = 'loading';
  message.innerText = 'carregando...';
  document.querySelector('.products').appendChild(message);
};

const removeLoadingScreen = () => {
  const message = document.querySelector('.loading');
  message.remove();
};

export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (search) => {
  // seu código aqui
  if (typeof search === 'undefined') {
    throw new Error('Termo de busca não informado');
  }
  showLoadingScreen();
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`);
  const data = await response.json();
  removeLoadingScreen();

  return data.results;
};
