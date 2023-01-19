export const getAddress = async (cep) => {
  // seu código aqui
  let res = '';
  try {
    const requestAwesome = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
    const requestBrasil = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
    Promise.any([requestAwesome, requestBrasil])
      .then((data) => {
        if (typeof data.address_type === 'undefined') {
          res = `${data.address} - ${data.district} - ${data.city} - ${data.state}`;
        } else {
          res = `${data.street} - ${data.neighborhood} - ${data.city} - ${data.state}`;
        }
      });
  } catch {
    res = 'CEP não encontrado';
  }
  return res;
};

export const searchCep = async () => {
  // seu código aqui
  const input = document.querySelector('.cep-input').innerHTML;
  document.querySelector('.cart__address').innerText = await getAddress(input);
};
