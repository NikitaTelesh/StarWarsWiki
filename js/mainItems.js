import {searchForm} from './search.js';
import {clearOldPagination, renderPagination} from './pagination.js';

const mainContent = document.querySelector('.main__content');
const mainTitle = document.querySelector('.main__title');
const preloader = document.querySelector('.main__preloader');
const forbiddenKeys = ['name', 'created', 'edited', 'url', 'homeworld'];

async function getAndRenderData(isPagination, href) {
	preloader.classList.remove('hidden');

	const response = await fetch(href);

	if (response.ok) {
		const obj = await response.json();
		const {results} = obj;

		renderMainItems(results);

		if (!isPagination) {
			const itemsPerPage = 10;
			const countOfPages = Math.ceil(obj.count/itemsPerPage);

			if (countOfPages < 2) {
				if (!href.includes('search')) {
					searchForm.classList.add('hide');
				}

				clearOldPagination();
			} else {
				renderPagination(href, countOfPages);
			}
		}

		preloader.classList.add('hidden');
	} else {
		console.log(`ERROR HTTP: ${response.status}`);
	}
}

function renderMainItems(results) {
	clearOldItemsListeners();

	mainContent.innerHTML = '';

	for(let i = 0; i < results.length; i++) {
		const itemData = results[i];

		const item = createItem(itemData);

		mainContent.append(item);
	}
}

function clearOldItemsListeners() {
	const oldItems = mainContent.querySelectorAll('.main__item-wrap');
	if (oldItems) {
		oldItems.forEach(item => {
			item.removeEventListener('click', changeHeightOnClick);
			item.removeEventListener('transitionend', transitionendHandler);
		})
	}
}

function createItem(itemData) {
	const itemWrap = createElem('div', 'main__item-wrap');
	const item = createElem('div', 'main__item item');
	const itemTitle = createElem('h3', 'item__title', itemData.name || itemData.title);
	const itemList = createElem('ul', 'item__list');

	itemWrap.prepend(item);
	item.prepend(itemTitle);
	item.append(itemList);

	for (let key in itemData) {
		if (typeof itemData[key] === 'string') {
			const [categoryName, categoryValue] = createTextForListItem(itemData, key);

			const listItem = createElem('li', 'item__list-item', categoryName);
			const span = createElem('span', '', categoryValue);

			listItem.append(span);
			itemList.append(listItem);
		}
	}

	itemWrap.addEventListener('click', changeHeightOnClick.bind(null, itemWrap, itemList));
	itemWrap.addEventListener('transitionend', transitionendHandler.bind(null, itemWrap, itemList))

	return itemWrap;
}

function createTextForListItem(data, key) {
	for (let i = 0; i < forbiddenKeys.length; i++) {
		if (key == forbiddenKeys[i]) {
			return '';
		}
	}

	return transformText(data, key);
}

function transformText(data, key) {
	let [firstPart, secondPart] = key.split('_');

	firstPart = firstPart.charAt(0).toUpperCase() + firstPart.slice(1);

	const categoryName = `${firstPart}${secondPart ? ` ${secondPart}` : ''}: `;

	return [categoryName, data[key]];
}

function changeHeightOnClick(itemWrap, itemList) {
	if (itemList.classList.contains('open')) {
		itemList.classList.remove('open');

		itemList.style.height = '';
		itemWrap.style.alignSelf = '';
	} else {
		itemList.classList.add('open');
		itemWrap.classList.add('open');

		itemList.style.height = itemList.scrollHeight + 'px';
	}
}

function transitionendHandler(itemWrap, itemList) {
	if (!itemList.classList.contains('open')) {
		itemWrap.classList.remove('open');
	} else {
		itemWrap.style.alignSelf = 'stretch';
	}
}

function createElem(elemName = 'div', nameOfClass = '', text = '') {
	const elem = document.createElement(elemName);
	elem.className = nameOfClass;
	elem.textContent = text;

	return elem;
}

export {mainTitle, getAndRenderData, createElem};
