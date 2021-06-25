function setImageBackgroundUrl(){
	const ibg = document.querySelectorAll(".ibg");

	for (var i = 0; i < ibg.length; i++) {
		const img = ibg[i].querySelector('.img-ibg');

		if (img) {
			ibg[i].style.backgroundImage = `url(${img.src})`;
		};
	};
}

export {setImageBackgroundUrl};
