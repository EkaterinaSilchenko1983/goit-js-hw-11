import './css/styles.css';

// import SimpleLightbox from 'simplelightbox';

// import 'simplelightbox/dist/simple-lightbox.min.css';

// let lightbox = new SimpleLightbox('.gallery a');
const base_url = 'https://pixabay.com/api/';
const KEY = '30770270-1c512d3309800b706c0d5f4a2';

const axios = require('axios').default;

async function getUser() {
  try {
    const response = await axios.get(
      `${base_url}?key=${KEY}&q=dog&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
getUser();
