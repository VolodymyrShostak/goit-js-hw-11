import { getImages } from './api/apisearch';
import { createMarkup } from './templates/imgcard';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formSubmitRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadBtnRef = document.querySelector('.load-more');

formSubmitRef.addEventListener('submit', onSubmitForm);
loadBtnRef.addEventListener('click', onClickLoadBtn);

let simpleLightbox = new SimpleLightbox('.gallery a');
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
    return;
  }
  await renderMarkup(searchQuery, page);
  simpleLightbox.refresh();
}

async function onClickLoadBtn() {
  page += 1;
  await renderMarkup(searchQuery, page);
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
    const totalHits = data.totalHits;
    amountHit = 40 * page;
    const markup = createMarkup(arrHits);
    galleryRef.insertAdjacentHTML('beforeend', markup);
    simpleLightbox.refresh();
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
