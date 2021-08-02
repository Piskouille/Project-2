const burgerWrapper = document.getElementById('burger-wrapper')
const burgerBtn = document.getElementById('burger-btn')

let burgerIsActive = false

burgerBtn.addEventListener('click', handleBurgerBtn)

function handleBurgerBtn(){
  burgerIsActive = !burgerIsActive;
  if(burgerIsActive){
    return burgerWrapper.classList.add('active')
  }
    return burgerWrapper.classList.remove('active')
}