document.addEventListener('DOMContentLoaded', () => {
	const modal = document.querySelector('.modal-wrapper');
	const overlay = document.querySelector('.overlay');
	const closeModalBtn = document.querySelector('.modal__close');
	const openModalBtn = document.querySelectorAll('.modal-btn'); // Замените на кнопку, открывающую модалку

	// Открытие модального окна
	const openModal = () => {
		modal.classList.add('active');
		overlay.classList.add('active');
		document.body.style.overflow = 'hidden'; // Блокировка скролла
	};

	// Закрытие модального окна
	const closeModal = () => {
		modal.classList.remove('active');
		overlay.classList.remove('active');
		document.body.style.overflow = ''; // Возврат скролла
	};

	// Событие на открытие модалки (пример)
	openModalBtn.forEach(item => item.addEventListener('click', openModal));
	// openModalBtn.addEventListener('click', openModal);

	// Событие на закрытие модалки
	closeModalBtn.addEventListener('click', closeModal);
	overlay.addEventListener('click', closeModal); // Закрытие при клике на затемнение

	// Закрытие при нажатии на Esc
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && modal.classList.contains('active')) {
			closeModal();
		}
	});
});
