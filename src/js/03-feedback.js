import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';
const formData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {};
getFormOutput();
refs.form.addEventListener('input', throttle(onSaveInput, 500));
refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  if (formData.email && formData.message) {
    console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
    localStorage.removeItem(LOCALSTORAGE_KEY);
  } else {
    alert('Заполните все поля, пожалуйста!');
  }
  event.currentTarget.reset();
  localStorage.clear();
}

function onSaveInput(event) {
  event.preventDefault();
  const userMessage = event.target.value;
  const userEmail = event.target.name;
  formData[userEmail] = userMessage;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}
function getFormOutput() {
  const savedFormData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  try {
    const dataArr = JSON.parse(savedFormData);
    if (dataArr.email) {
      ref.email.value = dataArr.email;
    }

    if (dataArr.message) {
      ref.message.value = dataArr.message;
    }
  } catch (error) {
    error.name;
    error.message;
  }
}
