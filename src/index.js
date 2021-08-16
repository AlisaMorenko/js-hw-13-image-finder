import ApiService from './api-service';
import imgTmpl from './imageCard.hbs';
import './sass/main.scss';

const inputEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const btnEl = document.querySelector('[data-action="load-more"]');

const apiService = new ApiService();

inputEl.addEventListener('submit', onSearch);

btnEl.classList.add('is-hidden');

function onSearch(e) {
  e.preventDefault();

  clearAImgContainer();
  apiService.query = e.currentTarget.elements.query.value;
  if (apiService.query === '') {
    return alert('Enter request!');
  }
  apiService.resetPage();
  apiService.fetchImg().then(imgMarkup);
  btnEl.addEventListener('click', onLoadMore);
  btnEl.classList.remove('is-hidden');
}

function onLoadMore() {
  apiService.fetchImg().then(imgMarkup);
}

function imgMarkup(hits) {
  galleryEl.insertAdjacentHTML('beforeend', imgTmpl(hits));
  galleryEl.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function clearAImgContainer() {
  galleryEl.innerHTML = '';
}
