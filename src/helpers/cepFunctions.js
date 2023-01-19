export const getAddress = async (cep) => {
  // seu código aqui
  const neededClass = '.cart__address';
  let res = '';
  try {
    const requestAwesome = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
    const requestBrasil = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
    Promise.any([requestAwesome, requestBrasil])
      .then((data) => data.json()).then((data) => {
        if (typeof data.address_type !== 'undefined') {
          res = `${data.address} - ${data.district} - ${data.city} - ${data.state}`;
          document.querySelector(neededClass).innerHTML = res;
        } else {
          res = `${data.street} - ${data.neighborhood} - ${data.city} - ${data.state}`;
          document.querySelector(neededClass).innerHTML = res;
        }
      });
  } catch {
    res = 'CEP não encontrado';
    document.querySelector(neededClass).innerHTML = res;
  }
  // document.querySelector(neededClass).innerHTML = res;
};

export const searchCep = async () => {
  // seu código aqui
  const input = document.querySelector('.cep-input').value;
  await getAddress(input);
  // console.log(result);
  // document.querySelector('.cart__address').innerHTML = result;
};
