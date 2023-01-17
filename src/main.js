import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID } from './helpers/cartFunctions';
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
  removeLoadingScreen();

  computers.forEach((element) => {
    sectionEl.appendChild(createProductElement(element));
    const allProducts = document.querySelectorAll('.product');
    const lastProduct = allProducts[allProducts.length - 1];

    lastProduct.querySelector('.product__add').addEventListener('click', async () => {
      const productID = lastProduct.querySelector('.product__id').innerText;
      saveCartID(productID);
      const details = await fetchProduct(productID);

      const neededDetails = {
        id: details.id,
        title: details.title,
        price: details.price,
        pictures: details.pictures,
      };
      document.querySelector('.cart__products')
        .appendChild(createCartProductElement(neededDetails));
    });
  });
} catch {
  const message = document.querySelector('.loading');
  message.className = 'error';
  message.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
}

document.querySelector('.cep-button').addEventListener('click', searchCep);
