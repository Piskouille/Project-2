const modalBtn = document.getElementById('user');
const userMenu = document.getElementById('user-menu')

modalBtn.addEventListener('click', () => {
  userMenu.classList.toggle('active')
})

