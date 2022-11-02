// import { getImages } from './api/apisearch';
// import Notiflix from 'notiflix';

// const formSubmitRef = document.querySelector('#search-form');
// const galleryRef = document.querySelector('.gallery');
// const loadBtnRef = document.querySelector('.load-more');

// formSubmitRef.addEventListener('submit', onSubmitForm);
// loadBtnRef.addEventListener('click', onClickLoadBtn);
// // обробка події сабміту форми
// function onSubmitForm(e) {
//   e.preventDefault();
//   let searchValue = e.currentTarget.searchQuery.value.trim();
//   if (!searchValue) {
//     Notiflix.Notify.warning(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//     return;
//   }
//   cteateImageCard(searchValue);
// }
 
// <div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>;
