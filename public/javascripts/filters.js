const filters = document.querySelectorAll('.aside-filter')
const cards = document.querySelectorAll('.restaurant-card')
const filterAll = document.querySelector('#mainFilters #filter-all')
const filterAllBurger = document.querySelector('#burgerFilters #filter-all')

filters.forEach(filter => {
    filter.addEventListener('mouseenter', () => {
        if(!filter.classList.contains('clicked')){
            filter.classList.add('in-transition')
            setTimeout(() => filter.classList.remove('in-transition'), 350)
        }
        filter.classList.add('active')
    })
    filter.addEventListener('mouseleave', () => {
        if(!filter.classList.contains('clicked')){
            filter.classList.add('in-transition')
            setTimeout(() => filter.classList.remove('in-transition'), 350)
        } 
        filter.classList.remove('active')
    })
    
    filter.addEventListener('click', () => {
        filter.classList.remove('in-transition')
        filter.classList.remove('active')
        filter.classList.toggle('clicked')
       
        let activeFilters = []

        filters.forEach(fil => {
            if(fil.classList.contains('clicked') && fil.id !== 'filter-all'){
                activeFilters.push(fil.innerText)
            }
        })
        
        if(activeFilters.length === 0 || filter.id === 'filter-all'){

            filters.forEach(f => f.classList.remove('clicked'))

            filterAll.classList.add('clicked')
            filterAllBurger.classList.add('clicked')

            cards.forEach(card => {
                card.style.display = 'block'
            })
        }
        else{
            filterAll.classList.remove('clicked')
            filterAllBurger.classList.remove('clicked')
  
            cards.forEach(card => {
                const foodTypes = card.querySelector('.foodTypes').innerText.split(' - ')
                let hasToBeDisplayed = false
                foodTypes.forEach(ft => {
                    if(activeFilters.includes(ft.trim())) hasToBeDisplayed = true
                })
    
                if(hasToBeDisplayed){
                    card.style.display = 'block'
                }         
                else{
                    card.style.display = 'none'
                }
            })
        }
    })
})
