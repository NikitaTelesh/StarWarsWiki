import {clickHandler} from './clickHandler.js';
import {createElem} from './mainItems.js';

const pagination = document.querySelector('.pagination');

function renderPagination(href, countOfPagination) {
	clearOldPagination();

	if (countOfPagination > 1) {
		const paginationList = createElem('ul', 'pagination__list');

		for (let i = 0; i < countOfPagination; i++) {
			const paginationItem = createElem('li', 'pagination__item');
			const paginationLink = createPaginationLink(href, i+1);

			paginationLink.addEventListener('click', clickHandler);

			paginationItem.prepend(paginationLink);
			paginationList.append(paginationItem);
		}

		pagination.prepend(paginationList);
	}
}

function clearOldPagination() {
	const oldPaginationList = document.querySelector('.pagination__list');
	if (oldPaginationList) {
		const oldLinks = oldPaginationList.querySelectorAll('a');
		oldLinks.forEach(item => item.removeEventListener('click', clickHandler));

		oldPaginationList.remove();
	}
}

function createPaginationLink(href, serialNumber) {
	const link = document.createElement('a');
	link.className = 'pagination__link';
	link.href = href.slice(0, href.length - 1) + serialNumber;
	link.textContent = serialNumber;

	return link;
}

export {renderPagination, clearOldPagination};
