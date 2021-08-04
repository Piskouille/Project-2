const modalBtn = document.getElementById('user');
const userMenu = document.getElementById('user-menu')

modalBtn.addEventListener('click', () => {
  userMenu.classList.toggle('active')
  const nav = document.querySelector('.nav')
  nav.style.zIndex = 0
  if (nav.style.zIndex == 0) {
    nav.style.zIndex = 20
  } else {
    nav.style.zIndex = 0
  }
})

