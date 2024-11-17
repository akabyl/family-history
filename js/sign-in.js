const steps = document.querySelectorAll('.step');
const stepBtns = document.querySelectorAll('.step__btn');
const nextBtns = [
	document.getElementById('next-btn'),
	document.getElementById('next-btn-2'),
	document.getElementById('next-btn-3'),
];
const prevBtn = document.getElementById('back');

let currentStep = 0;
let selectedMethod = 'email'; // По умолчанию выбран метод входа по почте

// Показываем шаг
function showStep(stepIndex) {
	steps.forEach((step, index) => {
		step.classList.toggle('active', index === stepIndex);
	});
	prevBtn.classList.toggle('hidden', stepIndex === 0);
	checkFieldsValidity(stepIndex); // Проверяем валидность кнопки
}

// Проверяем видимость элемента
function isVisible(element) {
	return element.offsetParent !== null;
}

// Проверяем валидность всех полей текущего шага
function checkFieldsValidity(stepIndex) {
	const step = steps[stepIndex];
	const inputs = step.querySelectorAll('input');
	const nextBtn = nextBtns[stepIndex];

	let allValid = true;

	inputs.forEach(input => {
		if (isVisible(input) && !input.value.trim()) {
			allValid = false;
		}
	});

	// Меняем стиль кнопки "Далее"
	if (allValid) {
		nextBtn.classList.add('valid');
		nextBtn.disabled = false;
	} else {
		nextBtn.classList.remove('valid');
		nextBtn.disabled = true;
	}
}

// Валидация текущего шага
function validateStep(stepIndex) {
	const step = steps[stepIndex];
	const inputs = step.querySelectorAll('input');
	const errorBlock = step.querySelector('.step__error');

	if (stepIndex === 0) {
		return true; // Первый шаг всегда валиден
	}

	if (!errorBlock) {
		console.error('Блок ошибки (.step__error) не найден в шаге:', stepIndex);
		return false;
	}

	const errorText = errorBlock.querySelector('.step__error-text');
	let allValid = true;

	errorBlock.style.display = 'none'; // Скрываем блок ошибки перед проверкой

	inputs.forEach(input => {
		if (!input.value.trim() && isVisible(input)) {
			input.classList.add('error');
			allValid = false;

			// Устанавливаем текст ошибки в зависимости от поля
			if (input.id === 'sign-email') {
				errorText.textContent = 'Введите почту';
			} else if (input.id === 'sign-tel') {
				errorText.textContent = 'Введите номер телефона';
			} else if (input.id === 'sms-code') {
				errorText.textContent = 'Введите код';
			}

			errorBlock.style.display = 'flex'; // Показываем блок ошибки
		} else {
			input.classList.remove('error');
			input.classList.add('valid');
		}
	});

	return allValid;
}

// Обновляем валидацию полей ввода при изменении
function setupInputValidation() {
	steps.forEach((step, stepIndex) => {
		const inputs = step.querySelectorAll('input');
		inputs.forEach(input => {
			input.addEventListener('input', () => {
				if (input.value.trim()) {
					input.classList.add('valid');
					input.classList.remove('error');
				} else {
					input.classList.remove('valid');
					// input.classList.add('error');
				}

				// Проверяем валидность всех полей текущего шага
				checkFieldsValidity(stepIndex);
			});
		});
	});
}

// Устанавливаем выбранный метод входа
stepBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		stepBtns.forEach(button => button.classList.remove('active'));
		btn.classList.add('active');
		selectedMethod = btn.textContent.includes('почте') ? 'email' : 'phone';

		// Переключаем видимость форм
		const phoneInput = document.querySelector('.phone-input');
		const emailInput = document.querySelector('.email-input');
		phoneInput.style.display = selectedMethod === 'phone' ? 'block' : 'none';
		emailInput.style.display = selectedMethod === 'email' ? 'block' : 'none';

		checkFieldsValidity(currentStep); // Проверяем валидность текущего шага
	});
});

// Обрабатываем кнопки "Далее"
nextBtns.forEach((btn, index) => {
	btn.addEventListener('click', () => {
		if (validateStep(index)) {
			currentStep++;
			if (currentStep === 1 && selectedMethod) {
				const phoneInput = document.querySelector('.phone-input');
				const emailInput = document.querySelector('.email-input');
				phoneInput.style.display = selectedMethod === 'phone' ? 'block' : 'none';
				emailInput.style.display = selectedMethod === 'email' ? 'block' : 'none';
			}
			if (currentStep < steps.length) {
				showStep(currentStep);
			} else {
				alert('Регистрация завершена!');
			}
		}
	});
});

// Обрабатываем кнопку "Назад"
prevBtn.addEventListener('click', () => {
	currentStep--;
	showStep(currentStep);
});

// Установка начального состояния
function initialize() {
	// Устанавливаем по умолчанию метод "Вход по почте"
	const emailButton = document.querySelector('.step__btn:first-child');
	emailButton.classList.add('active');

	const phoneInput = document.querySelector('.phone-input');
	const emailInput = document.querySelector('.email-input');

	phoneInput.style.display = 'none'; // Скрываем форму для телефона
	emailInput.style.display = 'block'; // Показываем форму для почты

	showStep(0);
}

// Инициализация
setupInputValidation();
initialize();
