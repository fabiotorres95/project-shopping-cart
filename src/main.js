import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
import './style.css';

// variables and aux functions
let onLoadTotal = 0;
const ids = getSavedCartIDs();
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

      onLoadTotal += neededDetails.price;
      document.querySelector('.total-price').innerText = onLoadTotal;
      console.log(onLoadTotal);
    });
  });
} catch {
  const message = document.querySelector('.loading');
  message.className = 'error';
  message.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
}
// show what's saved in LocalStorage already
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
organized.forEach((newData) => {
  document.querySelector('.cart__products')
    .appendChild(createCartProductElement(newData));
});

// show total price in cart
const prices = organized.map((object) => object.price);
console.log(prices);
for (let index = 0; index < prices.length; index += 1) {
  onLoadTotal += prices[index];
}
console.log(onLoadTotal);
document.querySelector('.total-price').innerText = onLoadTotal;

document.querySelector('.cep-button').addEventListener('click', searchCep);
