//TRICK TO CHANGE priceRating NUMBER IN EUR SVG
const displayPrice = () => {
  const priceRating = document.querySelectorAll(".priceRating");

  priceRating.forEach((price) => {
    let count = +price.innerText;
    price.innerHTML = "";

    for (let i = 0; i < 4; i++) {
      const priceImg = document.createElement("img");
      priceImg.src = "/images/euro.svg";
      priceImg.classList.add("euro");
      if (count <= 0) priceImg.style.opacity = ".4";

      count--;
      price.appendChild(priceImg);
    }
  });
};

displayPrice();

//ARROW SEE MORE && DISPLAY DETAILS
const cards = document.querySelectorAll(".restaurant-card");

cards.forEach((card) => {
  const banner = card.querySelector(".restaurant-card-banner");
  const seeMore = card.querySelector(".see-more");
  const perso = card.closest('.restaurant-card').querySelector('.personal-notes')
  const persoBtn = card.closest('.restaurant-card').querySelector('.notes')


  card.addEventListener("click", () => {

    cards.forEach((c) => {
      if (c !== card) {
        const persoC = c.closest('.restaurant-card').querySelector('.personal-notes')
        const persoBtnC = c.closest('.restaurant-card').querySelector('.notes')

        if(persoC.classList.contains('clicked')){
          persoC.classList.remove('clicked')
          persoBtnC.classList.toggle('dark-green')
          setTimeout(() => {
            c.querySelector(".see-more").classList.remove("active");
            c.querySelector(".restaurant-card-banner").classList.remove("active");
          }, 500)
    
        }else{
          c.querySelector(".see-more").classList.remove("active");
          c.querySelector(".restaurant-card-banner").classList.remove("active");
        }
      }
    });

    banner.style.height = `${Math.round(
      card.getBoundingClientRect().height
    )}px`;

    if(perso.classList.contains('clicked')){
      perso.classList.remove('clicked')
      persoBtn.classList.toggle('dark-green')
      setTimeout(() => {
        seeMore.classList.toggle("active");
        banner.classList.toggle("active");
      }, 500)

    }else{
      seeMore.classList.toggle("active");
      banner.classList.toggle("active");
    }

  });
});

//FORMAT DESCRIPTION
const des = document.querySelectorAll(".restaurant-card-description");

des.forEach(
  (d) =>
    (d.innerHTML =
      d.innerText.charAt(0).toUpperCase() + d.innerText.slice(1) + ".")
);

//PERSONAL DETAILS
const favorites = document.querySelectorAll(".favorite");

favorites.forEach((fav) => {

  fav.addEventListener("click", async (e) => {
    e.stopPropagation();

    const cardId = fav.parentElement.dataset.cardId;

    if(!fav.classList.contains("isFavorite")){
      try{
        const isAuth = await favPost(cardId)
        console.log(isAuth)
        if(isAuth){
          fav.classList.toggle("isFavorite");
          fav.nextElementSibling.classList.toggle("isFavorite")
          return
        }
      }
      catch(err){
        return console.log('Error on favorite POST route', err)
      }
    }

    if(fav.classList.contains("isFavorite")){
      try{
        const isAuth = await favGet(cardId)
        if(isAuth){
          fav.classList.toggle("isFavorite")
          fav.nextElementSibling.classList.toggle("isFavorite")
          return
        }
      }
      catch(err){
        return console.log('Error on favorite GET route', err)
      }
    }

  });
});


const notes = document.querySelectorAll(".notes");


notes.forEach(n => {
  const notesInput = n.closest('.restaurant-card').querySelector('.personal-notes textarea')
  const persoNotes =  n.closest('.restaurant-card').querySelector('.personal-notes')
  const notes = n.closest('.restaurant-card').querySelector('.notes')
  const noteId = n.parentElement.dataset.cardId;

  notesInput.addEventListener('click', e => e.stopPropagation())

  n.addEventListener('click', async (e) => {
    e.stopPropagation()

    try{

      persoNotes.classList.toggle('clicked')
      notes.classList.toggle('dark-green')

      if(!persoNotes.classList.contains('clicked')){
        console.log(notesInput.value)
        return notePost(noteId, notesInput.value)
      }

      notesInput.focus()
      const noteData = await noteGet(noteId)
      return noteData.data.length !== 0 ? notesInput.value = noteData.data[0].content : null
    }
    catch(err){
      console.log('ERR with note AJAX', err)
    }
  })
})


function favPost(id){
  return axios.post(`/favorite/${id}`);
}

function favGet(id){
  return axios.get(`/favorite/${id}`);
}

function noteGet(id){
  return axios.get(`/note/${id}`)
}

function notePost(id, data){
  return axios.post(`/note/${id}`, { 
    data: data
  })
}
