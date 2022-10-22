import './css/styles.css';
import { fetchImages } from './js/fetchImages';

// import SimpleLightbox from 'simplelightbox';

// import 'simplelightbox/dist/simple-lightbox.min.css';

// let lightbox = new SimpleLightbox('.gallery a');
const refs = {
  searchForm: document.querySelector('#search-form'),
  inputData: document.querySelector('input'),
  searchBtn: document.querySelector('button[type="submit"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  const searchData = e.currentTarget.elements.searchQuery.value.trim();
  console.log(searchData);
  fetchImages(searchData);
}

function onLoadMore(e) {
  fetchImages(searchData);
}
