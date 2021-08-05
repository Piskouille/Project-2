import {style} from './mapStyle.js';
const mapsBtn = document.getElementById('maps-btn')
const maps = document.getElementById('maps')
const iconBase =
"https://developers.google.com/maps/documentation/javascript/examples/full/images/";

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

console.log(style)

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
            console.log('OVERMARKER')
        })

    });
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