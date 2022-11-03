import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31023163-94386fc9f1fd647d996722da2';
const AMOUNT_PAGE = 40;

export async function getImages(name, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        q: name,
        per_page: AMOUNT_PAGE,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export default AMOUNT_PAGE;
