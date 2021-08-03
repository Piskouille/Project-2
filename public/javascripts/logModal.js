const modalBtn = document.getElementById('user');
const closeModalBtn = document.getElementById('close-modal');
const modal = document.getElementById('logModal');
const submitBtn = document.getElementById('submit');
const nameInput = document.getElementById('name');
const passwordConfirm = document.getElementById('passwordConfirm');
const password = document.getElementById('password');
const feedback = document.getElementById('feedback');
const form = document.querySelector('.formModal');
const googleAuth = document.getElementById('googleAuth');
const slackAuth = document.getElementById('slackAuth');
const registered = document.getElementById('registered');
const signUpLink = document.getElementById('signUpLink');
const signInLink = document.getElementById('signInLink');

// const BASE_URL = `http://localhost:${process.env.PORT}/`;

confirmPass();
strongPass();

signUpLink.onclick = () => {
  document.querySelector('.front').classList.toggle('active')
  document.querySelector('.back').classList.toggle('active')
}

signInLink.onclick = () => {
  document.querySelector('.back').classList.toggle('active')
  document.querySelector('.front').classList.toggle('active')
}

modalBtn.onclick = () => {
  if (modal.style.display === 'none' || !modal.style.display) {
    modal.style.display = 'block';
    modal.classList.toggle('modalActive');
  } else {
    modal.style.display = 'none';
  }
};
closeModalBtn.onclick = () => {
  modal.style.display = 'none';
  modal.classList.toggle('modalActive');
};

submitBtn.onclick = async (e) => {
  e.preventDefault();

  if (form.id === 'formSignIn') {
    const email = document.getElementById('email').value;
    const pass = password.value;
    const success = await axios.post('http://localhost:5000/auth/ajax/signin', {
      email,
      password: pass,
    });
    feedback.innerHTML = success.data;
    return;
  } else {
    
  }

  
  //TODO
};

// signUpLink.onclick = () => {
//   const modal = document.getElementById('')
//   modalContent.classList.toggle('back')
//   modalContent.classList.toggle('front')

// }

// linkModal.onclick = () => {
//   form.id = form.id === 'formSignIn' ? 'formSignUp' : 'formSignIn';
//   displayForm();
// };

// function displayForm() {
//   if (form.id === 'formSignIn') {
//     signInForm();
//   } else {
//     signUpForm();
//   }
// }

// function signInForm() {
//   form.classList.toggle('transition');
//   setTimeout(() => {
//     nameInput.previousElementSibling.style.display = 'none';
//     nameInput.style.display = 'none';
//     passwordConfirm.previousElementSibling.style.display = 'none';
//     passwordConfirm.style.display = 'none';
//     submitBtn.textContent = 'Log in';
//     linkModal.textContent = 'Sign up';
//     registered.textContent = 'No account yet? ';
//   }, 1000);
//   form.classList.toggle('transition');
// }

// function signUpForm() {
//   form.classList.toggle('transition');
//   setTimeout(() => {
//     nameInput.previousElementSibling.style.display = 'inline';
//     nameInput.style.display = 'inline';
//     passwordConfirm.previousElementSibling.style.display = 'inline';
//     passwordConfirm.style.display = 'inline';
//     submitBtn.textContent = 'Sign up';
//     linkModal.textContent = 'Sign in';
//     registered.textContent = 'Already registered?  ';
//   }, 1000);
//   form.classList.toggle('transition');
// }

function strongPass() {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  password.onkeyup = () => {
    const passed = regex.test(password.value);
    console.log(password.value);
    if (!passed) {
      feedback.textContent =
        'Your password must contain atleast 8 characters, one uppercase letter, one lowercase and one number.';
      feedback.style.color = 'red';
      submitBtn.disabled = true;
    } else {
      feedback.textContent = '';
      submitBtn.disabled = false;
    }
  };
}

function confirmPass() {
  passwordConfirm.onkeyup = () => {
    if (passwordConfirm.value !== password.value) {
      feedback.textContent = 'Passwords are not matching.';
      feedback.style.color = 'red';
      submitBtn.disabled = true;
    } else {
      feedback.textContent = 'Passwords are matching.';
      feedback.style.color = '#21C078';
      submitBtn.disabled = false;
    }
  };
}

googleAuth.onclick = () => {
  window.open(
    '/auth/google',
    '',
    ' scrollbars=yes,menubar=no,width=500, resizable=yes,toolbar=no,location=no,status=no'
  );
};

slackAuth.onclick = () => {
  window.open(
    '/auth/slack',
    '',
    ' scrollbars=yes,menubar=no,width=500, resizable=yes,toolbar=no,location=no,status=no'
  );
};
