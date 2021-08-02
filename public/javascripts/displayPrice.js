const displayPrice = () => {
    const priceRating = document.querySelectorAll('.priceRating')
  
    priceRating.forEach(price => {
      let count = + price.innerText 
      price.innerHTML = ""
    
      for(let i = 0; i < 4; i ++){
        const priceImg = document.createElement('img');
        priceImg.src = '/images/euro.svg'
        priceImg.classList.add("euro")
        if(count <= 0) priceImg.style.opacity = ".2"
        
        count--
        price.appendChild(priceImg);
      }
    })
  }
  
  displayPrice()