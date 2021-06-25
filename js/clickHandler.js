import {mainTitle, getAndRenderData} from './mainItems.js';
import {searchForm, searchInput} from './search.js';

function clickHandler(e) {
	e.preventDefault();

	const {href} = e.target;

	let isPagination = true;
	if (e.target.classList.contains('nav__category')) {
		isPagination = false;

		mainTitle.textContent = e.target.textContent;

		searchInput.value = '';
		searchForm.classList.remove('hide');
	}

	getAndRenderData(isPagination, href);
}

export {clickHandler};
