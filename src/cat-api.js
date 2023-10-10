import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_j0PXTwsWPSNbuk4phhkecTP4N2pjLLyhTVlVF8rmfXGAHXLiEXV58yUQ0smzsXSw';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const failure = document.querySelector('.error');

function fetchBreeds() {
  breedSelect.classList.add('invisible');
  failure.classList.add('invisible');
  return axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
    console.log(response.data);
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  catInfo.classList.add('invisible');
  failure.classList.add('invisible');
  loader.classList.remove('invisible');
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      console.log(response.data[0]);
      return (chosenCatInfo = response.data[0]);
    });
}

export { fetchBreeds, fetchCatByBreed };
