import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const failure = document.querySelector('.error');

const breedSelect = new SlimSelect({
  select: '.breed-select',
  events: {
    afterChange: data => {
      console.log(data);
      const breedId = data[0].value;
      console.log(breedId);
      fetchCatByBreed(breedId)
        .then(response => {
          loader.classList.add('invisible');
          catInfo.classList.remove('invisible');
          renderCatInfo(response);
        })
        .catch(error => {
          console.log(error);
          loader.classList.add('invisible');
          Notify.failure('Oops! Something went wrong! Try reloading the page!');
          // failure.classList.remove('invisible');
        });
    },
  },
});

// breedSelect.classList.add('invisible');
// failure.classList.add('invisible');

function renderSelect(breeds) {
  // breedSelect.classList.remove('invisible');
  loader.classList.add('invisible');
  breedSelect.setData(
    breeds.map(breed => ({
      text: breed.name,
      value: breed.id,
      //       // return `<option value="${breed.id}">${breed.name}</option>`;
    }))
  );
  //   // .join('');
  //   // breedSelect.insertAdjacentHTML('beforeend', markup);
}

fetchBreeds()
  .then(breeds => {
    // breedSelect.classList.remove('invisible');

    renderSelect(breeds);
  })
  .catch(error => {
    loader.classList.add('invisible');
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    // failure.classList.remove('invisible');
  });

function renderCatInfo(chosenCatInfo) {
  const breedInfo = chosenCatInfo.breeds[0];
  const breedFoto = chosenCatInfo.url;

  catInfo.innerHTML = `<div class="cat-wrapper"><div class="image-wrapper"><img class="cat-image" alt="${breedInfo.name}" src="${breedFoto}"/></div><div class="info-wrapper"><h3 class="breed-name">${breedInfo.name}</h3><p class="breed-description">${breedInfo.description}</p><p class="breed-temperament">${breedInfo.temperament}</p></div></div>`;
}

// breedSelect.addEventListener('change', () => {
//   catInfo.classList.add('invisible');
//   const breedId = breedSelect.value;
//   fetchCatByBreed(breedId)
//     .then(response => {
//       loader.classList.add('invisible');
//       catInfo.classList.remove('invisible');
//       renderCatInfo(response);
//     })
//     .catch(error => {
//       console.log(error);
//       loader.classList.add('invisible');
//       failure.classList.remove('invisible');
//     });
// });
