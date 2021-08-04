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

  card.addEventListener("click", () => {
    cards.forEach((c) => {
      if (c !== card) {
        c.querySelector(".see-more").classList.remove("active");
        c.querySelector(".restaurant-card-banner").classList.remove("active");
      }
    });

    banner.style.height = `${Math.round(
      card.getBoundingClientRect().height
    )}px`;
    seeMore.classList.toggle("active");
    banner.classList.toggle("active");
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
  n.addEventListener('click', (e) => {
    e.stopPropagation()

    n.closest('.personal-notes').classList.toggle('clicked')
    
  })
})

function favPost(id){
  return axios.post(`http://localhost:5000/favorite/${id}`);
}


function favGet(id){
  return axios.get(`http://localhost:5000/favorite/${id}`);
}