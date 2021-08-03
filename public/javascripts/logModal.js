const { default: axios } = require('axios');

const modalBtn = document.getElementById('user');
const closeModalBtn = document.getElementById('close-modal');
const modal = document.getElementById('logModal');
const submitBtn = document.getElementById('submit');
const linkModal = document.getElementById('linkModal');
const name = document.getElementById('name');
const passwordConfirm = document.getElementById('passwordConfirm');
const feedback = document.getElementById('feedback');
const form = document.querySelector('.formModal');
const googleAuth = document.getElementById('googleAuth')
const slackAuth = document.getElementById('slackAuth')

const BASE_URL = `http://localhost:${process.env.PORT}/`;
let isModalDisplayed = false;

displayForm();

modalBtn.addEventListener('click', () => {
  isModalDisplayed = true;

  if (isModalDisplayed) {
    modal.style.display = 'block';
  }

  return;
});

modalBtn.addEventListener('click', () => {
  isModalDisplayed = false;

  if (!isModalDisplayed) {
    modal.style.display = 'none';
  }
  return;
});

googleAuth.onclick = () => {
  window.open('/auth/google',
    '',
    ' scrollbars=yes,menubar=no,width=500, resizable=yes,toolbar=no,location=no,status=no')
}

slackAuth.onclick = () => {
  window.open('/auth/slack',
    '',
    ' scrollbars=yes,menubar=no,width=500, resizable=yes,toolbar=no,location=no,status=no')
}

submitBtn.onclick = async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const nameValue = document.getElementById('name').value;
  const confirmedPass = document.getElementById('passwordConfirm').value;
  if (confirmedPass !== password) {
    feedback.innerHTML = 'Passwords are not matching.';
    feedback.style.color = 'red';
    return;
  }
//TODO  

  if (form.id === 'form_SignIn') {
    axios.post(BASE_URL + 'auth/signin');
  } else {
    axios.post(BASE_URL + 'auth/signup');
  }
};

linkModal.onclick = () => {
  form.id = form.id === 'form_SignIn' ? 'form_SignUp' : 'form_SignIn';
  displayForm();
};

function displayForm() {
  if (form.id === 'form_SignIn') {
    signInForm();
  } else {
    signUpForm();
  }
}

function signInForm() {
  name.previousElementSibling.style.display = 'none';
  name.style.display = 'none';
  passwordConfirm.previousElementSibling.style.display = 'none';
  passwordConfirm.style.display = 'none';
  submitBtn.innerHTML = 'Log in';
}

function signUpForm() {
  name.previousElementSibling.style.display = 'inline';
  name.style.display = 'inline';
  passwordConfirm.previousElementSibling.style.display = 'inline';
  passwordConfirm.style.display = 'inline';
  submitBtn.innerHTML = 'Sign up';
}
