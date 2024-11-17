const steps = document.querySelectorAll('.step');
const stepBtns = document.querySelectorAll('.step__btn');
const nextBtns = [
	document.getElementById('next-btn'),
	document.getElementById('next-btn-2'),
	document.getElementById('next-btn-3'),
];
const prevBtn = document.getElementById('back');
let currentStep = 0;

function showStep(stepIndex) {
	steps.forEach((step, index) => {
		step.classList.toggle('active', index === stepIndex);
	});
	prevBtn.classList.toggle('hidden', stepIndex === 0);
	checkFieldsValidity(stepIndex); // Проверяем валидность кнопки "Далее"
}

function validateStep(stepIndex) {
	const step = steps[stepIndex];
	const inputs = step.querySelectorAll('input');
	const errorBlock = step.querySelector('.step__error');

	// Если это первый шаг, просто возвращаем true
	if (stepIndex === 0) {
		return true;
	}

	if (!errorBlock) {
		console.error('Блок ошибки (.step__error) не найден в шаге:', stepIndex);
		return false;
	}

	const errorText = errorBlock.querySelector('.step__error-text');
	let allValid = true;

	errorBlock.style.display = 'none'; // Скрываем блок ошибки перед проверкой

	inputs.forEach(input => {
		if (!input.value.trim()) {
			input.classList.add('error');
			input.previousElementSibling?.classList.add('error');
			allValid = false;

			// Устанавливаем текст ошибки для конкретного поля
			if (input.id === 'parent-first-name') {
				errorText.textContent = 'Введите своё имя';
			} else if (input.id === 'parent-last-name') {
				errorText.textContent = 'Введите свою фамилию';
			} else if (input.id === 'parent-email') {
				errorText.textContent = 'Введите свою почту';
			} else if (input.id === 'parent-birth-date' || input.id === 'child-birth-date') {
				errorText.textContent = 'Введите дату рождения';
			} else if (input.id === 'child-name') {
				errorText.textContent = 'Введите имя и фамилию малыша';
			} else if (input.id === 'sms-code') {
				errorText.textContent = 'Введите код';
			} else if (input.id === 'sign-email') {
				errorText.textContent = 'Введите почту';
			}

			// Показываем блок ошибки
			errorBlock.style.display = 'flex';
			return;
		} else {
			input.classList.remove('error');
			input.classList.add('valid');
			input.parentNode.classList.add('valid');
		}
	});

	return allValid;
}

// Проверяем валидность всех полей текущего шага
function checkFieldsValidity(stepIndex) {
	const step = steps[stepIndex];
	const inputs = step.querySelectorAll('input');
	const nextBtn = nextBtns[stepIndex];

	let allValid = true;

	inputs.forEach(input => {
		if (input.offsetParent !== null && !input.value.trim()) {
			// Проверяем только видимые поля
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

// Добавляем обработчики на ввод данных в инпуты
function setupInputValidation() {
	steps.forEach((step, stepIndex) => {
		const inputs = step.querySelectorAll('input');
		inputs.forEach(input => {
			input.addEventListener('input', () => {
				const sibling = input.previousElementSibling;
				if (input.value.trim()) {
					input.classList.add('valid');
					input.classList.remove('error');
					input.parentNode.classList.add('valid');

					// Проверяем и обновляем соседний элемент
					if (sibling) {
						sibling.classList.remove('error');
						sibling.classList.add('valid');
					}
				} else {
					input.classList.remove('valid');
					input.parentNode.classList.remove('valid');

					// Проверяем и обновляем соседний элемент
					if (sibling) {
						sibling.classList.remove('valid');
						sibling.classList.add('error');
					}
				}

				// Проверяем валидность кнопки текущего шага
				checkFieldsValidity(stepIndex);
			});
		});
	});
}

// Обработчики событий для кнопок "Далее"
nextBtns.forEach((btn, index) => {
	btn.addEventListener('click', () => {
		if (validateStep(index)) {
			currentStep++;
			if (currentStep < steps.length) {
				showStep(currentStep);
			} else {
				alert('Регистрация завершена!');
			}
		}
	});
});

// Обработчик для кнопки "Назад"
prevBtn.addEventListener('click', () => {
	currentStep--;
	showStep(currentStep);
});

// Обработчики для переключения кнопок регистрации
stepBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		stepBtns.forEach(button => button.classList.remove('active'));
		btn.classList.add('active');
	});
});

// Инициализация обработки ввода данных
setupInputValidation();
showStep(0);
