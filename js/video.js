const playButton = document.querySelector('.play-button');

if (playButton) {
	playButton.addEventListener('click', function () {
		const preview = document.querySelector('.video-preview');
		const frame = document.querySelector('.video-frame');
		const button = document.querySelector('.play-button');

		// Скрыть превью и кнопку с плавной анимацией
		preview.style.opacity = '0';
		button.style.opacity = '0';

		// Убедиться, что кнопка больше недоступна
		setTimeout(() => {
			frame.style.opacity = '1';
			frame.style.pointerEvents = 'all'; // Включить взаимодействие с iframe
			button.setAttribute('inert', ''); // Отключить интерактивность кнопки
		}, 500);

		// Убрать кнопку из DOM после завершения анимации
		setTimeout(() => {
			button.style.display = 'none';
		}, 500);
	});
}
