import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input[name="email"]');
const textarea = document.querySelector('textarea[name="message"]');
const STORAGE_KEY = "feedback-form-state";
const formData = {};


form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(evt) {
    evt.preventDefault();
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    
    if (input.value === '' || textarea.value === '') {
        return alert('Please fill in all fields!');
    };
    
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
};

function onFormInput(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function populateForm() {
    const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (savedMessage) {
        const { email, message } = savedMessage;
        input.value = email;
        textarea.value = message;
    }
};
populateForm();