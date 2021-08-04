const burgerBtn = document.getElementById('burger-btn')
const burgerMenu = document.getElementById('burger-menu')
const burgerDone = document.querySelector('.burger-done')

let burgerIsActive = false

burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('active')
  burgerMenu.classList.toggle('active')
})


burgerDone.addEventListener('click', () => {
  console.log('done')
  burgerBtn.classList.toggle('active')
  burgerMenu.classList.toggle('active')
})




