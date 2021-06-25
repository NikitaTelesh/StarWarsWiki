import {getAndRenderData} from './mainItems.js';

const searchForm = document.querySelector('form.search');
const searchInput = searchForm.querySelector('.search__input');

function search(e) {
	e.preventDefault();

	const category = document.querySelector('.main__title').textContent.toLowerCase();
	const searchValue = searchInput.value.trim();

	const href = transformLink(category, searchValue);

	searchInput.value = '';

	getAndRenderData(false, href);
}

function transformLink(category, searchValue) {
	return `https://swapi.dev/api/${category}/?search=${searchValue}&page=1`;
}

function addSearchFormListener() {
	searchForm.addEventListener('submit', search);
}

export {searchForm, searchInput, addSearchFormListener};
