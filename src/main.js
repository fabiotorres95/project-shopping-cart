import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

const sectionEl = document.querySelector('.products');

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

showLoadingScreen();
try {
  const computers = await fetchProductsList('computador');
  computers.forEach((element) => {
    sectionEl.appendChild(createProductElement(element));
  });
  removeLoadingScreen();
} catch {
  const message = document.querySelector('.loading');
  message.className = 'error';
  message.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
}

document.querySelector('.cep-button').addEventListener('click', searchCep);
