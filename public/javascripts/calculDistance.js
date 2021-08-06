const distElems = document.querySelectorAll('.user-distance')

function haversine_distance(point_1, point_2) {
    const R = 3958.8; // Radius of the Earth in miles
    const rlat1 = point_1.lat * (Math.PI/180); // Convert degrees to radians
    const rlat2 = point_2.lat * (Math.PI/180); // Convert degrees to radians
    const difflat = rlat2-rlat1; // Radian difference (latitudes)
    const difflon = (point_2.lng-point_1.lng) * (Math.PI/180); // Radian difference (longitudes)

    const d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));

    const distance = Math.round(d * 1609.34)
    
    return distance >= 1000 ? `${Math.round(distance / 100)} Km` : `${distance} m`
}
console.log(navigator.geolocation)
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
console.log(user_location)
      distElems.forEach(d => {
        const distance = haversine_distance(user_location, JSON.parse(d.innerHTML))

        d.innerHTML = distance
      })


    },
      function () {
        const iciCestParis = {
            lat: 48.856614,
            lng: 2.3522219
        };
    
        distElems.forEach(d => {
            const distance = haversine_distance(iciCestParis, JSON.parse(d.innerHTML))
            d.innerHTML = distance
          })
      })
    }