import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';
const formData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {};

refs.form.addEventListener('input', throttle(onSaveInput, 500));
refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  if (formData.email && formData.message) {
    event.preventDefault();
    event.currentTarget.reset();
    console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
    localStorage.removeItem(LOCALSTORAGE_KEY);
  } else {
    alert('Заполните все поля, пожалуйста!');
  }
}

function onSaveInput(event) {
  const userMessage = event.target.value;
  const userEmail = event.target.name;
  formData[userEmail] = userMessage;

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}
function getFormOutput() {
  const savedFormData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  if (savedFormData) {
    refs.email.value = savedFormData.email || '';
    refs.message.value = savedFormData.message || '';
  }
}
