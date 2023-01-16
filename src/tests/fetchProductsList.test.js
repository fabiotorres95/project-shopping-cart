import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('testa se o retorno da função é a estrutura de dados esperada', async () => {
    const result = await fetchProductsList('computador');
    expect(result).toStrictEqual(computadorSearch);
  });

  it('testa se ao chamar a função sem argumentos, uma mensagem de erro é retornada', async () => {
    const result = await fetchProductsList();
    expect(result).toThrow('Termo de busca não informado');
  });
});
