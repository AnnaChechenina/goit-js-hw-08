import throttle from 'lodash.throttle';
// ініціалізація елементів форми
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};
// Ключ для сховища
const LOCALSTORAGE_KEY = 'feedback-form-state';

// Змінні форми
let formData = {
  email: '',
  message: '',
};
// Під час завантаження сторінки перевіряй стан
// сховища, і якщо там є збережені дані, заповнюй ними
// поля форми.В іншому випадку поля повинні бути порожніми.
const stringFormData = localStorage.getItem(LOCALSTORAGE_KEY);
if (stringFormData) {
  fillFormOnLoad(stringFormData);
}
// відстеження події input і submit з throttle затримка 500ms
refs.form.addEventListener('input', throttle(onSaveInput, 500));
refs.form.addEventListener('submit', onSubmitForm);

// Функція події submit
// заповнення всіх полів обовязкове
// виведення у консоль об'єкту з полями email,
//  message та їхніми поточними значеннями.
// Під час сабміту очищення сховища і полів

function onSubmitForm(event) {
  event.preventDefault();
  if (formData.email === '' || formData.message === '') {
    alert('Заполните все поля, пожалуйста!');
    return;
  }
  event.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  localStorage.clear();
}
// Функція події input
// Відстеж, на формі події input, і щоразу запис
// у локальне сховище об'єкту з полями email і message,
// з поточ значен полів .
function onSaveInput(event) {
  if (localStorage.getItem(LOCALSTORAGE_KEY) === null) {
    formData = {
      email: '',
      message: '',
    };
  }
  formData[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}
// обробка помилок
function fillFormOnLoad(str) {
  try {
    formData = JSON.parse(str);
    for (const key in formData) {
      refs.form.elements[key].value = formData[key];
    }
  } catch (error) {
    error.name;
    error.message;
  }
}
