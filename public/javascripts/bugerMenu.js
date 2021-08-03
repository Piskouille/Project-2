const burgerWrapper = document.getElementById('burger-wrapper')
const burgerBtn = document.getElementById('burger-btn')
const burgerMenu = document.getElementById('burger-menu')

let burgerIsActive = false

burgerBtn.addEventListener('click', () => {
  burgerWrapper.classList.toggle('active')
  burgerMenu.classList.toggle('active')
})




