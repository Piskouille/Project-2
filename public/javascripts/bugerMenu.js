const burgerBtn = document.getElementById('burger-btn')
const burgerMenu = document.getElementById('burger-menu')

let burgerIsActive = false

burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('active')
  burgerMenu.classList.toggle('active')
})




