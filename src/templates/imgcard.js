function createMarkup(arr) {
  return arr
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
 <div class="photo-card">
 <a class="card-ref" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height="250" />
        </a>
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
      }
    )
    .join('');
}
export default createMarkup;
