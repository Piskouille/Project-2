const modalBtn = document.getElementById('user');
const userMenu = document.getElementById('user-menu');
const addUser = document.getElementById('searchUser')
const followList = document.getElementById('following-list');
const favoritesList = document.getElementById('favorites');
const mainList = document.getElementById('main-list');

modalBtn.addEventListener('click', () => {
  openCloseMenu();
});

async function fetchInfos() {
  followList.innerHTML = '';
  favoritesList.innerHTML = '';
  const id = modalBtn.getAttribute('data-id');
  const { data } = await axios.get('/users/' + id);

  const fav = data.favorites;
  
  fav.forEach((favorite) => {
    let foodTypesString = '';
    const r = favorite.restaurant;
    r.foodTypes.forEach((type, i, arr) => {
      foodTypesString += type.name.charAt(0).toUpperCase() + type.name.slice(1);
      if (i !== arr.length - 1) {
        foodTypesString += ' - ';
      }
    });

    favoritesList.innerHTML += `
     <div class="restaurant-card">
       <div class="content">
         <div class="image">
           <img src="${r.image}" alt="${r.name}" />
         </div>
         <div class="general-infos">
           <h4>${r.name}</h4>
           <div class="foodTypes">${foodTypesString}</div>
           <div class="short-infos">
             <div class="priceRating">${r.priceRating}</div>
           </div>
         </div>
         
         <div class="details-perso" data-card-id="${r._id}">
           <span class="favorite isFavorite">
           <i class="fas fa-heart fa-lg"></i>
            
           </span>
           <span class="notes isFavorite"> 
                <i class="fas fa-edit fa-file-alt fa-lg"></i>
            </span>
         </div>
       </div>
       <p class="description">${r.description}</p>
     </div>
     `;

    //`
    // <div class="restaurant-card" >
    //   <div class='content'>
    //           <div class="general-infos">
    //             <div class="titles">
    //                 <h4>${r.name}</h4>
    //                 <div class="foodTypes">
    //                     ${foodTypesString}
    //                 </div>
    //             </div>
    //             <div class="short-infos">
    //                 <div class="priceRating">
    //                     ${r.priceRating}
    //                 </div>
    //             </div>
    //           </div>

    //           <p class='description'>
    //               ${r.description}
    //           </p>

    //       <div class="details-perso" data-card-id="${r._id}">
    //           <span class="favorite" >
    //               <i class="fas fa-heart fa-lg"></i>
    //           </span>

    //           <span class="notes">
    //               <i class="fas fa-edit fa-file-alt fa-lg"></i>
    //           </span>
    //       </div>
    //   </div>
    //   <div id="background-img" style="background:url(${r.image})"></div>
    // </div>`;
  });
  displayPrice();
  
  updateFollow()
  attachListeners();
  const favorites = document.querySelectorAll('#favorites .favorite');
  favorites.forEach((fav) => {
    fav.addEventListener('click', async (e) => {
      e.stopPropagation();

      const cardId = fav.parentElement.dataset.cardId;
      console.log(cardId)

      if (fav.classList.contains('isFavorite')) {
        try {
          const isAuth = await favGet(cardId);
          console.log(isAuth);
          if (isAuth) {
            fav.classList.toggle('isFavorite');
            fav.nextElementSibling.classList.toggle('isFavorite');
            fetchInfos();
            return;
          }
        } catch (err) {
          return console.log('Error on favorite GET route', err);
        }
      }
    });
  });
}

function attachListeners() {
  document
    .querySelectorAll('#main-list a, #favorites-list a, #following-list a')
    .forEach((a) => {
      a.onclick = () => {
        openCloseMenu();
      };
    });
}

async function updateFollow () {
  const userId = modalBtn.getAttribute('data-id');
  const { data } = await axios.get('/users/' + userId);

  followList.innerHTML = '';
  const following = data.user.following;
  let length = following.length > 5 ? 5 : following.length;
  for (let i = 0; i < length; i++) {
    const li = document.createElement('li');
    li.setAttribute('data-id', following[i]._id);
    li.textContent = following[i].name;
    followList.append(li);
  }
  let li = document.createElement('li');
  li.innerHTML = '<a href="#">More...</a>';
  followList.append(li);
}

function openCloseMenu() {
  userMenu.classList.toggle('active');
  const nav = document.querySelector('.nav');
  if (userMenu.classList.contains('active')) {
    fetchInfos();
    nav.style.zIndex = 20;
  } else {
    const timeoutId = setTimeout(() => {
      nav.style.zIndex = 1;
      clearTimeout(timeoutId);
    }, 300);
  }
}

const displayPrice = () => {
  const priceRating = document.querySelectorAll('#favorites .priceRating');

  priceRating.forEach((price) => {
    let count = +price.innerText;
    price.innerHTML = '';

    for (let i = 0; i < 4; i++) {
      const priceImg = document.createElement('img');
      priceImg.src = '/images/euro.svg';
      priceImg.classList.add('euro');
      if (count <= 0) priceImg.style.opacity = '.4';

      count--;
      price.appendChild(priceImg);
    }
  });
};

function favGet(id){
  return axios.get(`/favorite/${id}`);
}

addUser.onclick = async () => {
  const email = document.getElementById('addUser').value
  const searched = await axios.post('/users/email', {email})
  if (searched.data === 'not found') {
    document.getElementById('userAddInfos').textContent = 'Sorry, user not found!'
  } else if (searched.data === 'already added') {
    document.getElementById('userAddInfos').textContent = `You ${searched.data} this user!`
  } else {
    document.getElementById('userAddInfos').textContent = `Successfully added ${searched.data}`
    updateFollow()
  }
  
}