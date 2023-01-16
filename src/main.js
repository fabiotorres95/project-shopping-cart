import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

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
const computers = await fetchProductsList('computador');
removeLoadingScreen();
const sectionEl = document.querySelector('.products');

computers.forEach((element) => {
  sectionEl.appendChild(createProductElement(element));
});

document.querySelector('.cep-button').addEventListener('click', searchCep);
