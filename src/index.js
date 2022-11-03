import { getImages } from './api/apisearch';
import createMarkup from './templates/imgcard';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import AMOUNT_PAGE from './api/apisearch';

const formSubmitRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadBtnRef = document.querySelector('.load-more');
const submitBtnRef = document.querySelector('.submit');

formSubmitRef.addEventListener('submit', onSubmitForm);
loadBtnRef.addEventListener('click', onClickLoadBtn);

let simpleLightbox = new SimpleLightbox('.gallery a');
let page = 1;
let amountHit = 0;
let searchQuery = '';
loadBtnRef.classList.add('hidden');

formSubmitRef.onfocus = function () {
  submitBtnRef.classList.remove('hidden');
};

async function onSubmitForm(e) {
  e.preventDefault();
  page = 1;
  galleryRef.innerHTML = '';

  searchQuery = e.currentTarget.searchQuery.value.trim();
  if (!searchQuery) {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  await renderMarkup(searchQuery, page);
  simpleLightbox.refresh();
}

async function onClickLoadBtn() {
  page += 1;
  loadBtnRef.classList.add('hidden');

  await renderMarkup(searchQuery, page);
}

async function renderMarkup(name, page) {
  try {
    const data = await getImages(name, page);
    const arrHits = data.hits;
    if (arrHits.length === 0) {
      loadBtnRef.classList.add('hidden');

      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    const totalHits = data.totalHits;

    const markup = createMarkup(arrHits);
    amountHit = AMOUNT_PAGE * page;
    galleryRef.insertAdjacentHTML('beforeend', markup);
    simpleLightbox.refresh();
    loadBtnRef.classList.remove('hidden');
    if (amountHit >= totalHits && totalHits > AMOUNT_PAGE) {
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
