import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
import './style.css';

// variables and aux functions
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
const LocalPromises = async (LocalIDs) => {
  const result = LocalIDs.map((id) => fetchProduct(id));
  const organizedResult = await Promise.all(result);
  return organizedResult;
};

// shows the computers on screen
showLoadingScreen();
try {
  const computers = await fetchProductsList('computador');
  removeLoadingScreen();

  computers.forEach((element) => {
    sectionEl.appendChild(createProductElement(element));
    const allProducts = document.querySelectorAll('.product');
    const lastProduct = allProducts[allProducts.length - 1];

    // how each 'add to cart' button will work
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
// show what's saved in LocalStorage already
const ids = getSavedCartIDs();
const products = await LocalPromises(ids);
const organized = products.map((data) => {
  const result = {
    id: data.id,
    title: data.title,
    price: data.price,
    pictures: data.pictures,
  };
  return result;
});
console.log(organized);
organized.forEach((newData) => {
  console.log(newData);
  document.querySelector('.cart__products')
    .appendChild(createCartProductElement(newData));
});

document.querySelector('.cep-button').addEventListener('click', searchCep);
