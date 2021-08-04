const target = document.querySelector('.restaurant-list')
const userSVG = document.querySelector('#user svg')
const user = document.querySelector('#user')
const lightGreen = "rgb(33, 192, 120)"
const yellow = "rgb(205, 205, 205)"

const callback = (entries, observer) => {

    entries.forEach(entry => {

            const userClientPos = user.getBoundingClientRect()
            const userPos = userClientPos.y + userClientPos.height/2
            const targetPos = target.getBoundingClientRect().y

            if(targetPos < userPos){

                const userColor = getComputedStyle(userSVG).color
    
                if(userColor === yellow){
                    user.classList.add('dark-green')
                }
    
                if(userColor === lightGreen){
                    user.classList.add('light-green')
                }
    
            }

            if(targetPos >= userPos){
            
                if(user.classList.contains('dark-green')) user.classList.remove('dark-green')
                if(user.classList.contains('light-green')) user.classList.remove('light-green')
    
            }
    })
}

const myObserver = new IntersectionObserver(callback, {
    rootMargin: `89px 0px ${90 - window.innerHeight}px 0px`
})

if(window.innerWidth > 768){

    myObserver.observe(target)

    //! Il faudrait gérer le resize
    // window.addEventListener('resize', () => {
    //     console.log('resize')
    //     myObserver.observe(target)
    // })
   
}
