import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const failure = document.querySelector('.error');

function renderSelect(breeds) {
  const markup = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);
}

fetchBreeds()
  .then(breeds => {
    loader.classList.add('invisible');
    breedSelect.classList.remove('invisible');
    renderSelect(breeds);
  })
  .catch(error => {
    console.log(error);
    loader.classList.add('invisible');
    failure.classList.remove('invisible');
  });

function renderCatInfo(chosenCatInfo) {
  const breedInfo = chosenCatInfo.breeds[0];
  const breedFoto = chosenCatInfo.url;

  catInfo.innerHTML = `<img class="cat-image" alt="${breedInfo.name}" src="${breedFoto}"/><h3 class="breed-name">${breedInfo.name}</h3><p class="breed-description">${breedInfo.description}</p><p class="breed-temperament">${breedInfo.temperament}</p>`;
}

breedSelect.addEventListener('change', () => {
  const breedId = breedSelect.value;
  fetchCatByBreed(breedId)
    .then(response => {
      loader.classList.add('invisible');
      catInfo.classList.remove('invisible');
      renderCatInfo(response);
    })
    .catch(error => {
      console.log(error);
      loader.classList.add('invisible');
      failure.classList.remove('invisible');
    });
});
