import { getImages } from './api/apisearch';
import Notiflix from 'notiflix';

const formSubmitRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadBtnRef = document.querySelector('.load-more');

formSubmitRef.addEventListener('submit', onSubmitForm);
// loadBtnRef.addEventListener('click', onClickLoadBtn);
let page = 1;
let amountHit = 0;
loadBtnRef.classList.add('hidden');
// обробка події сабміту форми
async function onSubmitForm(e) {
  e.preventDefault();
  galleryRef.innerHTML = '';
  let searchQuery = e.currentTarget.searchQuery.value.trim();
  console.log(searchQuery);
  if (!searchQuery) {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  renderMarkup(searchQuery, page);
}

async function renderMarkup(name, page) {
  try {
    const data = await getImages(name, page);
    const arrHits = data.hits;
    if (arrHits.length === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    totalHits = data.totalHits;
    page += 1;
    amountHit += 1;
    const markup = createMarkup(arrHits);

    galleryRef.insertAdjacentHTML('beforeend', markup);

    if (amountHit >= totalHits) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );

      return;
    }
  } catch (error) {
    console.log(error, error.message);
  }
}

function createMarkup(arr) {
  return arr
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `
 <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height="250" />
        <div class="info">
          <p class="info-item">
            <b class="photo-card_text">Likes</b><span>
            ${likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b><span>
            ${views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b><span>
            ${comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b><span>
            ${downloads}</span>
          </p>
        </div>
      </div>`;
    })
    .join('');
}
