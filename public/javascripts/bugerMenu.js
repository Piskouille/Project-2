const burgerWrapper = document.getElementById('burger-wrapper')
const burgerBtn = document.getElementById('burger-btn')
const burgerMenu = document.getElementById('burger-menu')

let burgerIsActive = false

burgerBtn.addEventListener('click', handleBurgerBtn)

function handleBurgerBtn(){
  burgerIsActive = !burgerIsActive;
  if(burgerIsActive){
    burgerMenu.classList.add('active')
    return burgerWrapper.classList.add('active')
  }
    burgerMenu.classList.remove('active')
    return burgerWrapper.classList.remove('active')
}

