import {addSearchFormListener} from './search.js';
import {addMenuListeners, addNavLinksListeners} from './menu.js';
import {setImageBackgroundUrl} from './setImageBackground.js';
import {getAndRenderData} from './mainItems.js';

function initApp(){
	getAndRenderData(false, 'https://swapi.dev/api/people/?page=1');

	addNavLinksListeners();
	addSearchFormListener();
	addMenuListeners();
	setImageBackgroundUrl();
}

initApp();
