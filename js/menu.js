import {clickHandler} from './clickHandler.js';

const navList = document.querySelector('.nav__list')

function addMenuListeners() {
	const maska = document.querySelector('._burger-maska');
	const burgerContainer = document.querySelector('.nav__burger');
	const burger = burgerContainer.querySelector('.burger');
	const menuComponents = [navList, burger, maska];

	maska.addEventListener("click", function(){
		menuComponents.forEach(item => item.classList.remove('open'));
	});

	burgerContainer.addEventListener("click", function(){
		menuComponents.forEach(item => item.classList.toggle('open'));
	});
}

function addNavLinksListeners() {
	const navLinks = navList.querySelectorAll('.nav__category');

	navLinks.forEach(item => {
		item.addEventListener('click', clickHandler);
	})
}

export {addMenuListeners, addNavLinksListeners};
