import { getImages } from './api/apisearch';
import Notiflix from 'notiflix';

const formSubmitRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadBtnRef = document.querySelector('.load-more');

formSubmitRef.addEventListener('submit', onSubmitForm);
loadBtnRef.addEventListener('click', onClickLoadBtn);
let page = 1;
let amountHit = 0;
let searchQuery = '';
loadBtnRef.classList.add('hidden');

async function onSubmitForm(e) {
  e.preventDefault();
  page = 1;
  galleryRef.innerHTML = '';
  searchQuery = e.currentTarget.searchQuery.value.trim();
  if (!searchQuery) {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  await renderMarkup(searchQuery, page);
}

async function onClickLoadBtn(e) {
  page += 1;
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
    amountHit = 40 * page;
    const markup = createMarkup(arrHits);
    galleryRef.insertAdjacentHTML('beforeend', markup);
    loadBtnRef.classList.remove('hidden');
    if (amountHit >= totalHits) {
      loadBtnRef.classList.add('hidden');
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
            <b class="photo-card_text">Likes</b><span class="photo-card_data">
            ${likes}</span>
          </p>
          <p class="info-item">
            <b class="photo-card_text">Views</b><span class="photo-card_data" >
            ${views}</span>
          </p>
          <p class="info-item">
            <b class="photo-card_text">Comments</b><span class="photo-card_data">
            ${comments}</span>
          </p>
          <p class="info-item">
            <b class="photo-card_text">Downloads</b><span class="photo-card_data">
            ${downloads}</span>
          </p>
        </div>
      </div>`;
    })
    .join('');
}
