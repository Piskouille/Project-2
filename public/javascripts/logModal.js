const modalBtn = document.getElementById('user')
const closeModalBtn = document.getElementById('close-modal')
const modal = document.getElementById('logModal')

let isModalDisplayed = false

modalBtn.addEventListener('click', () => {
    isModalDisplayed = true
    
    if(isModalDisplayed){   
        modal.style.display = 'block'
    }

    return
})


modalBtn.addEventListener('click', () => {
    isModalDisplayed = false
    
    if(!isModalDisplayed){   
        modal.style.display = 'none'
    }

    return
})