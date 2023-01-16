export const fetchProduct = async (id) => {
  // seu código aqui
  if (typeof id === 'undefined') {
    throw new Error('ID não informado');
  }
  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await response.json();

  return data;
};

export const fetchProductsList = async (search) => {
  // seu código aqui
  if (typeof search === 'undefined') {
    throw new Error('Termo de busca não informado');
  }
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`);
  const data = await response.json();

  return data.results;
};
