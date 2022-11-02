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
  console.log(searchQuery);
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
    console.log(data);
    const arrHits = data.hits;
    console.log(arrHits);
    if (arrHits.length === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      renderMarkup(searchQuery);
      return;
    }
  } catch (error) {
    console.log(error, error.message);
  }
  //   const amountHits = data.totalHits;
  async function renderMarkup(name) {
    try {
      const data = await getImages(name);
      const arrData = data.hits;
      if (arrData.length === 0) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      totalHits = data.totalHits;
      nextPage += 1;
      calcHits += arrHits.length;

      const markup = createMarkup(arrHits);

      galleryRef.insertAdjacentHTML('beforeend', markup);

      showsButton();

      if (calcHits >= totalHits) {
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
        hiddenLoadBtn();
        return;
      }
    } catch (error) {
      console.log(error, error.message);
    }
  }
}
function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
 <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b><span>
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
      }
    )
    .join('');
}
