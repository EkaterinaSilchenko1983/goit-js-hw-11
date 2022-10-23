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
  const searchValue = refs.inputData.value.trim();

  // if (!searchValue) {
  //   refs.gallery.innerHTML = '';
  // }

  fetchImages(searchValue, page).then(data => {
    renderMarkup(data.hits);
    refs.loadMoreBtn.removeAttribute('hidden');
    lightbox.refresh();

    // if (data.hits.length === 0) {
    //   Notiflix.Notify.info(
    //     'Sorry, there are no images matching your search query. Please try again.'
    //   );
    // } else {
    //   renderMarkup(data.hits);
    //   lightbox.refresh();
    // }
  });
}

function onLoadMore(e) {
  page += 1;
  const searchValue = refs.inputData.value.trim();

  fetchImages(searchValue, page).then(data => {
    renderMarkup(data.hits);

    lightbox.refresh();
  });
}

function renderMarkup(images) {
  const markupImage = markup(images);
  refs.gallery.innerHTML += markupImage;
}
