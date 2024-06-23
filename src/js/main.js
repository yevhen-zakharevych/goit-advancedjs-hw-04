import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import * as api from './api';

const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('#load-more');
const per_page = 40;
let page = 1;

searchForm.addEventListener('submit', onSearch);

loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  page = 1;
  galleryContainer.innerHTML = '';
  loadMoreBtn.style.display = 'none';

  if (!searchQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Enter search query',
    });

    return;
  }

  fetchAndRenderImages({
    searchQuery,
    page: 1,
    per_page,
  });
}

function onLoadMore() {
  page += 1;
  loadMoreBtn.style.display = 'none';

  fetchAndRenderImages(
    {
      searchQuery: searchForm.elements.searchQuery.value.trim(),
      page,
      per_page,
    },
    true
  );
}

async function fetchAndRenderImages(options, isLoadMore = false) {
  const { searchQuery: q, page, per_page } = options;

  try {
    const data = await api.fetchImages({ q, page, per_page });

    if (data.total === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again.',
      });

      return;
    }

    if (!isLoadMore) {
      iziToast.success({
        title: 'Success',
        message: `Hooray! We found ${data.totalHits} images.`,
      });
    }

    if (data.totalHits > page * per_page) {
      loadMoreBtn.style.display = 'flex';
    } else {
      iziToast.error({
        title: 'Error',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    const images = data.hits
      .map(image => {
        return composeImage(image);
      })
      .join('');

    if (isLoadMore) {
      galleryContainer.insertAdjacentHTML('beforeend', images);

      return;
    }

    galleryContainer.innerHTML = images;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
  }
}

function composeImage(image) {
  return `
    <div class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span>${image.likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
          <span>${image.views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b>
          <span>${image.comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <span>${image.downloads}</span>
        </p>
      </div>
    </div>`;
}
