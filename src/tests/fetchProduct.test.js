import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('Verifica se fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('Verifica se fetchProduct chama a função fetch', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se fetchProduct usa o fetch com o endpoint correto', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it('Testa se o retorno da função e um objeto igual ao exemplo importado', async () => {
    const result = await fetchProduct('MLB1405519561');
    expect(result).toStrictEqual(product);
  });

  it('Verifica se fetchProduct usa o fetch com o endpoint correto', async () => {
    const result = await fetchProduct();
    expect(result).toThrow('ID não informado');
  });
});
