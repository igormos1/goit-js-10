const BASE_URL = 'https://restcountries.com/v2';//https://restcountries.com/#api-endpoints-v3-list-of-codes
function fetchCountries(all) {
  return fetch(`${BASE_URL}/name/${all}?fields=name,capital,population,flag,languages`)
    .then(resp => resp.json());
}

export default { fetchCountries };