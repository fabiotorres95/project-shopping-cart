export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = (search) => {
  // seu código aqui
  if (typeof search === 'undefined') {
    throw new Error('Termo de busca não informado');
  }
};
