//TRICK TO CHANGE priceRating NUMBER IN EUR SVG
const displayPrice = () => {
    const priceRating = document.querySelectorAll('.priceRating')
  
    priceRating.forEach(price => {
      let count = + price.innerText 
      price.innerHTML = ""
    
      for(let i = 0; i < 4; i ++){
        const priceImg = document.createElement('img');
        priceImg.src = '/images/euro.svg'
        priceImg.classList.add("euro")
        if(count <= 0) priceImg.style.opacity = ".4"
        
        count--
        price.appendChild(priceImg);
      }
    })
  }
  
  displayPrice()


//ARROW SEE MORE && DISPLAY DETAILS 
const cards = document.querySelectorAll('.restaurant-card')

cards.forEach(card => {
    const seeMore = card.querySelector('.see-more')
    const details = card.querySelector('.details')

    seeMore.addEventListener('click', () => {

        cards.forEach(c => {
            if(c !== card){
                c.querySelector('.see-more').classList.remove('active')
                c.querySelector('.details').classList.remove('active')
            } 
        })

        seeMore.classList.toggle('active')
        details.classList.toggle('active')
    })
})


//FORMAT DESCRIPTION 
const des = document.querySelectorAll('.restaurant-card-description')

des.forEach(d => 
    d.innerHTML = d.innerText.charAt(0).toUpperCase() + d.innerText.slice(1) + '.'
)


