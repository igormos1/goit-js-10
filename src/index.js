import '../src/css/styles.css';

import _debounce from 'lodash.debounce';//https://www.npmjs.com/package/lodash.debounce
import Notiflix from './js/notification'; //https://github.com/notiflix/Notiflix#readme

import countryCardTpl from './templates/country.hbs';
import countriesListTpl from './templates/countries.hbs';

import API from './js/fetchCountries';
import getRefs from './js/refs';

const refs = getRefs();
refs.input.addEventListener('input', _debounce(onInputCountry, 300));

function onInputCountry(e) {
  clearCountryInput();
  if (!e.target.value) {
    return;
  }
  API.fetchCountries(e.target.value).then(countyFilter).catch(Notiflix.error);
}

function countyFilter(country) {
   if (country.length === 1) {
        createCountryCard(country);
   }
   else if (country.length <= 10 && country.length > 1) {
        createCountriesList(country);
   }
   else if (country.status == 404) {
        return error;
      }
   else {
        Notiflix.needMore(country);
      }
}


function createCountryCard(country) {
  const markup = countryCardTpl(country);
  refs.country.insertAdjacentHTML('beforeend', markup);
}

function createCountriesList(countries) {
  const markup = countriesListTpl(countries);
  refs.country.insertAdjacentHTML('beforeend', markup);
}

function clearCountryInput() {
  refs.country.innerHTML = '';
}