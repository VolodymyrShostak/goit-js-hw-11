import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31023163-94386fc9f1fd647d996722da2';
const AMOUNT_PAGE = 40;

const URL = axios.create(BASE_URL, {
  params: {
    key: API_KEY,
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: 1,
    per_page: AMOUNT_PAGE,
  },
});
async function getImages(name) {
  const response = await URL.get(`?q=${name}`);
  console.log(response.data);
  return response.data;
}

export default getImages;
