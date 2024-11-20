document.addEventListener('DOMContentLoaded', () => {
	const overlay = document.querySelector('.overlay');
	const modalWrapper = document.querySelectorAll('.modal-wrapper');
	const openModalBtns = document.querySelectorAll('[data-target]');

	// Функция открытия модального окна
	const openModal = targetId => {
		// Закрыть все модалки перед открытием
		modalWrapper.forEach(modal => modal.classList.remove('active'));

		// Найти нужную модалку по id и открыть её
		const modalToOpen = document.getElementById(targetId);
		if (modalToOpen) {
			modalToOpen.classList.add('active');
			overlay.classList.add('active');
			document.body.style.overflow = 'hidden'; // Отключение скролла страницы
		}
	};

	// Функция закрытия всех модальных окон
	const closeModal = () => {
		modalWrapper.forEach(modal => modal.classList.remove('active'));
		overlay.classList.remove('active');
		document.body.style.overflow = ''; // Включение скролла страницы
	};

	// Привязка события открытия к кнопкам
	openModalBtns.forEach(button => {
		button.addEventListener('click', () => {
			const targetId = button.getAttribute('data-target');
			openModal(targetId);
		});
	});

	// Привязка события закрытия к кнопкам внутри модалок
	modalWrapper.forEach(modal => {
		const closeModalBtn = modal.querySelector('.modal__close');
		if (closeModalBtn) {
			closeModalBtn.addEventListener('click', closeModal);
		}
	});

	// Закрытие при клике на затемнение
	overlay.addEventListener('click', closeModal);

	// Закрытие по нажатию клавиши Esc
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape') {
			closeModal();
		}
	});
});
