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
  // loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);
// // refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  const searchValue = e.currentTarget.elements.searchQuery.value.trim();

  // if (!searchValue) {
  //   refs.gallery.innerHTML = '';
  // }

  fetchImages(searchValue).then(data => {
    renderMarkup(data.hits);

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

// function onLoadMore(e) {
//   fetchImages(searchValue);
// }

function renderMarkup(images) {
  const markupImage = markup(images);
  refs.gallery.innerHTML = markupImage;
}
