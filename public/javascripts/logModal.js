const modalBtn = document.getElementById('user');
const closeModalBtnSi = document.getElementById('close-modal-si');
const closeModalBtnSu = document.getElementById('close-modal-su');
const modal = document.getElementById('logModal');
const submitBtn = document.getElementById('submit');
const submitSignUp = document.getElementById('submitSignUp');
const nameInput = document.getElementById('name');
const passwordConfirm = document.getElementById('passwordConfirm');
const password = document.getElementById('password');
const form = document.querySelector('.formModal');
const googleAuth = document.getElementById('googleAuth');
const slackAuth = document.getElementById('slackAuth');
const registered = document.getElementById('registered');
const signUpLink = document.getElementById('signUpLink');
const signInLink = document.getElementById('signInLink');
const passwordSignUp = document.getElementById('passwordSignUp');

// const BASE_URL = `http://localhost:${process.env.PORT}/`;

confirmPass();
strongPass();

submitBtn.onclick = async (e) => {
  e.preventDefault();
  const feedback = document.querySelector('.modal-content.active #feedback');
  const email = document.getElementById('email').value;
  const pass = password.value;
  const success = await axios.post(
    'http://localhost:5000/auth/ajax/signin',
    {
      email,
      password: pass,
    },
    { withCredentials: true }
  );
  feedback.innerHTML = success.data;
  feedback.style.color = '#21C078'
  const timeOutId = setTimeout(() => {
    window.location.reload();
    clearTimeout(timeOutId);
  }, 1000);
  return;
};

submitSignUp.onclick = async (e) => {
  e.preventDefault();
  const name = document.getElementById('nameSignUp').value;
  const email = document.getElementById('emailSignUp').value;
  const pass = document.getElementById('passwordSignUp').value;
  const feedback = document.querySelector('.modal-content.active #feedback');
  if (pass !== passwordConfirm.value) {
    feedback.textContent = 'Passwords do not match';
    return;
  }
  const backResponse = await axios.post(
    'http://localhost:5000/auth/ajax/signup',
    {
      name,
      email,
      password: pass,
    },
    {
      withCredentials: true,
    }
  );
  feedback.textContent = backResponse.data;
  if (feedback.textContent === 'Succesfully Registered') {
    feedback.style.color = '#21C078'
    const timeoutId = setTimeout(() => {
      document.getElementById('signInLink').click();
      clearTimeout(timeoutId);
    }, 1000);
  }
  return;
};

// ---------------------------------------------------------
// Quick User experience for password strength
// ---------------------------------------------------------
function strongPass() {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  passwordSignUp.onkeyup = () => {
    const feedback = document.querySelector('.modal-content.active #feedback');
    const passed = regex.test(passwordSignUp.value);
    if (!passed) {
      passwordSignUp.style.boxShadow = 'inset 0px 0px 0px 3px red';
      feedback.innerHTML = 'Please provide 8 characters, a number<br>and a punctuation.';
      feedback.style.color = 'red';
      submitBtn.disabled = true;
    } else {
      passwordSignUp.style.boxShadow = 'inset 0px 0px 0px 3px #21C078';
      feedback.textContent = 'You password is safe!';
      feedback.style.color = '#21C078';
      submitBtn.disabled = false;
    }
  };
}

// ---------------------------------------------------------
// Quick User experience for password confirmation
// ---------------------------------------------------------
function confirmPass() {
  passwordConfirm.onkeyup = () => {
    const feedback = document.querySelector('.modal-content.active #feedback');
    if (passwordConfirm.value !== passwordSignUp.value) {
      passwordConfirm.style.boxShadow = 'inset 0px 0px 0px 3px red';
      feedback.textContent = 'Passwords are not matching.';
      feedback.style.color = 'red';
      submitBtn.disabled = true;
    } else {
      passwordConfirm.style.boxShadow = 'inset 0px 0px 0px 3px #21C078';
      feedback.textContent = 'Passwords are matching!';
      feedback.style.color = '#21C078';
      submitBtn.disabled = false;
    }
  };
}

// ---------------------------------------------------------
// Popup autoclosing and refreshing our mainpage on close
// ---------------------------------------------------------
googleAuth.onclick = () => {
  const win = window.open(
    '/auth/google',
    '',
    ' scrollbars=yes,menubar=no,width=500, resizable=yes,toolbar=no,location=no,status=no'
  );
  let intervalId = setInterval(() => {
    if (win.closed) {
      window.location.reload();
      clearInterval(intervalId);
    }
  }, 500);
};

slackAuth.onclick = () => {
  const win = window.open(
    '/auth/slack',
    '',
    ' scrollbars=yes,menubar=no,width=500, resizable=yes,toolbar=no,location=no,status=no'
  );
  let intervalId = setInterval(() => {
    if (win.closed) {
      window.location.reload();
      clearInterval(intervalId);
    }
  }, 500);
};

// ---------------------------------------------------------
// Animation switch
// ---------------------------------------------------------
signUpLink.onclick = () => {
  document.querySelector('.front').classList.toggle('active');
  document.querySelector('.back').classList.toggle('active');
};


signInLink.onclick = () => {
  document.querySelector('.back').classList.toggle('active');
  document.querySelector('.front').classList.toggle('active');
};

// ---------------------------------------------------------
// Show up modal
// ---------------------------------------------------------
modalBtn.onclick = () => {
  if (modal.style.display === 'none' || !modal.style.display) {
    modal.style.display = 'block';
    modal.classList.toggle('modalActive');
    document.querySelector('nav').style.zIndex = 900
  } else {
    modal.style.display = 'none';
    document.querySelector('nav').style.zIndex = 0

  }
};

// ---------------------------------------------------------
// Close modal on the signup/signin faces
// ---------------------------------------------------------
closeModalBtnSi.onclick = () => {
  modal.style.display = 'none';
  modal.classList.toggle('modalActive');
  document.querySelector('nav').style.zIndex = 0
};
closeModalBtnSu.onclick = () => {
  modal.style.display = 'none';
  modal.classList.toggle('modalActive');
  document.querySelector('nav').style.zIndex = 0
};
