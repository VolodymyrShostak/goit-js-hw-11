import { getImages } from './api/apisearch';
import Notiflix from 'notiflix';

const formSubmitRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadBtnRef = document.querySelector('.load-more');

formSubmitRef.addEventListener('submit', onSubmitForm);
// loadBtnRef.addEventListener('click', onClickLoadBtn);
// обробка події сабміту форми
async function onSubmitForm(e) {
  e.preventDefault();
  let searchQuery = e.currentTarget.searchQuery.value.trim();
  if (!searchQuery) {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  cteateImageCard(searchQuery);
}
async function cteateImageCard(name) {
    try {
        const data = await getImages(name);
        const arrData = data.hits;
        if (arrData.length === 0) {
            Notiflix.Notify.warning(
                'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
        }
    }


        /* <div class="photo-card">
        <img src="" alt="" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
          </p>
          <p class="info-item">
            <b>Views</b>
          </p>
          <p class="info-item">
            <b>Comments</b>
          </p>
          <p class="info-item">
            <b>Downloads</b>
          </p>
        </div>
      </div>; */
    
