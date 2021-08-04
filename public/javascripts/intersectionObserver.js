const target = document.querySelector('.restaurant-list')
const userSVG = document.querySelector('#user svg')
const user = document.querySelector('#user')
const lightGreen = "rgb(33, 192, 120)"
const yellow = "rgb(205, 205, 205)"

const callback = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.intersectionRatio > 0){
            const userColor = getComputedStyle(userSVG).color
            
            if(user.classList.contains('dark-green')) user.classList.remove('dark-green')

            if(userColor === yellow){
                user.classList.add('dark-green')
            }

            if(userColor === lightGreen){
                user.classList.add('light-green')
            }
        }
    })
}

const myObserver = new IntersectionObserver(callback, {
    rootMargin: `89px 0px ${90 - window.innerHeight}px 0px`
})

myObserver.observe(target)