import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchImages } from './js/fetchImages';
import markup from './templates/markup.hbs';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  inputData: document.querySelector('input'),
  searchBtn: document.querySelector('button[type="submit"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
let lightbox = new SimpleLightbox('.gallery a');
let page = 1;

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.setAttribute('hidden', true);

function onSearch(e) {
  e.preventDefault();
  clearImages();
  const searchValue = refs.inputData.value.trim();

  if (searchValue !== 0) {
    fetchImages(searchValue, page).then(data => {
      if (data.hits.length === 0) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderMarkup(data.hits);
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        refs.loadMoreBtn.removeAttribute('hidden');
        lightbox.refresh();
      }
    });
  }
}

function onLoadMore(e) {
  page += 1;
  const searchValue = refs.inputData.value.trim();

  fetchImages(searchValue, page).then(data => {
    renderMarkup(data.hits);

    lightbox.refresh();
  });
}

// function renderMarkup(images) {
//   const markupImage = markup(images);
//   refs.gallery.innerHTML += markupImage;
// }

function renderMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', markup(images));
}

function clearImages() {
  page = 1;
  refs.loadMoreBtn.setAttribute('hidden', true);
  refs.gallery.innerHTML = '';
}
