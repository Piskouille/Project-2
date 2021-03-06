import {style} from './mapStyle.js';
const mapsBtn = document.getElementById('maps-btn')
const maps = document.getElementById('maps')
const iconBase =
"https://developers.google.com/maps/documentation/javascript/examples/full/images/";
const landingPage = document.querySelector('.landing-page')

//IL FAUDRAIT GERER LE RESIZE
let mouseX = 0
let mouseY = 0

document.addEventListener('mousemove', e => {
    mouseX = e.clientX
    mouseY = e.clientY
})

mapsBtn.addEventListener('click', async () => {

    maps.classList.toggle('active')
    mapsBtn.classList.toggle('active') 

    if(maps.classList.contains('active')){
        const restaurants = await getRestaurants()
        const locations = restaurants.data
        startMap(locations);
        disableScroll()
    }
    else{
        enableScroll()
    }

})

function startMap(locations) {
    
    const iciCestParis = {
        lat: 48.856614,
        lng: 2.3522219
    };

    

    const map = new google.maps.Map(
      maps,
      {
        styles: style,
        zoom: 13,
        center: iciCestParis
      }
    );

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const user_location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
           
          map.setCenter(user_location);
     
          const userLocationMarker = new google.maps.Marker({
            position: {
              lat: user_location.lat,
              lng: user_location.lng
            },
            map: map,
            title: "You are here.",
            icon:
            {
               url: '/images/place.png',
               scaledSize : new window.google.maps.Size(50, 50),
               labelOrigin: new google.maps.Point(0, 0)
           },
           animation: google.maps.Animation.DROP,
           optimized: false
          });
     
        }, function () {
            console.log('Error in the geolocation service.');
          });
        }
    

    const markers = locations.map(async loc => {
        const marker = new google.maps.Marker({
            position: loc.coordinates,
            map: map,
            title: loc.name,
            label: {
                text: loc.name,
                color: '#131910',
                fontSize: '12px',
            },
            icon:
             {
                url: '/images/pin.png',
                scaledSize : new window.google.maps.Size(50, 50),
                labelOrigin: new google.maps.Point(0, 0)
            },
            animation: google.maps.Animation.DROP,
            optimized: false
        });
       

        marker.addListener('mouseover', () => {
            displayInfoBox(loc)
            //location = restaurant -_____-
        })

        marker.addListener('mouseout', () => {
            infoBox.innerHTML = ''
            //location = restaurant -_____-
        })

    });
}

const infoBox = document.getElementById('info-box')

function displayInfoBox(restaurant){
    //const favorites = await axios.get('/favorites/${restaurant._id}')

    infoBox.style.top = `${mouseY - landingPage.getBoundingClientRect().top - 125}px`
    infoBox.style.left = `${mouseX - landingPage.getBoundingClientRect().left + 15}px`

    infoBox.innerHTML = `
    <div id="map-card" class="restaurant-card">

        <div class="restaurant-card-img" >
            <img src="${restaurant.image}" alt="${restaurant.name}">
        </div>

        <div class="restaurant-card-banner">
            <div class="banner-header">
                <div class="titles">
                    <h3>${restaurant.name}</h3>
                    <div class="foodTypes">
                    ${
                        restaurant.foodTypes.map(type =>
                            (type.name.charAt(0).toUpperCase() + type.name.slice(1))
                            .split("_")
                            .join(" ")
                        ).join(' - ')
                    }
                    </div>
                </div>
                <div class="short-infos">
                    <div class="priceRating">
                        ${restaurant.priceRating}
                    </div>
                </div>
                <span class="see-more"></span>
            </div>


            <div class="details">
                <p class="restaurant-card-description">
                    ${restaurant.description}
                </p>
            </div>
        </div>
    </div>`


    const priceRating = document.querySelector('#map-card .priceRating')
    let count = +priceRating.innerText;
    priceRating.innerHTML = "";

    for (let i = 0; i < 4; i++) {
      const priceImg = document.createElement("img");
      priceImg.src = "/images/euro.svg";
      priceImg.classList.add("euro");
      if (count <= 0) priceImg.style.opacity = ".4";

      count--;
      priceRating.appendChild(priceImg);
    }

}

function disableScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}
  
function enableScroll() {
    window.onscroll = function() {};
}

function getRestaurants(){
    return axios.get('/restaurants')
}

function getOneRestaurant(id){
    return axios.get(`/restaurant/:${id}`)
}