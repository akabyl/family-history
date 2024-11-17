document.addEventListener('DOMContentLoaded', () => {
	const galleryItems = document.querySelectorAll('.photo-gallery__item img'); // Все изображения галереи
	const swiperContainer = document.querySelector('.swiper-container');
	const swiperWrapper = document.querySelector('.swiper-wrapper');

	// Очистка слайдов перед добавлением (на случай повторного вызова)
	swiperWrapper.innerHTML = '';

	// Инициализация Swiper
	const swiper = new Swiper('.swiper-container', {
		navigation: {
			nextEl: '.custom-next',
			prevEl: '.custom-prev',
		},
		loop: true, // Зацикливание слайдов
	});

	// Добавление изображений в слайдер
	galleryItems.forEach(item => {
		const slide = document.createElement('div'); // Создаём новый слайд
		slide.classList.add('swiper-slide');

		const img = document.createElement('img');
		img.src = item.src;
		img.alt = item.alt;

		slide.appendChild(img); // Вставляем изображение в слайд
		swiperWrapper.appendChild(slide); // Добавляем слайд в обёртку Swiper
	});

	// Открытие слайдера при клике на изображение
	galleryItems.forEach((item, index) => {
		item.addEventListener('click', () => {
			swiperContainer.classList.remove('hidden'); // Показать слайдер
			swiper.update(); // Обновить Swiper (на случай, если что-то поменялось)
			swiper.slideTo(index); // Перейти к соответствующему слайду
		});
	});

	// Закрытие слайдера при клике вне слайдов
	swiperContainer.addEventListener('click', event => {
		const isClickInsideContent =
			event.target.closest('.custom-next') ||
			event.target.closest('.custom-prev') ||
			event.target.closest('.download');

		if (!isClickInsideContent) {
			swiperContainer.classList.add('hidden'); // Скрыть слайдер
		}
	});

	// Закрытие слайдера при нажатии клавиши Esc
	document.addEventListener('keydown', event => {
		if (event.key === 'Escape') {
			swiperContainer.classList.add('hidden'); // Скрыть слайдер
		}
	});
});
