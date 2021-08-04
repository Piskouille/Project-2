const modalBtn = document.getElementById('user');
const userMenu = document.getElementById('user-menu')
const prefix = 'http://localhost:5000'
const followList = document.getElementById('following-list')
const favoritesList = document.getElementById('favorites-list')
const mainList = document.getElementById('main-list')

modalBtn.addEventListener('click', () => {
  openCloseMenu()
})

async function fetchInfos() {
  
  followList.innerHTML = ''
  favoritesList.innerHTML = ''
  const id = modalBtn.getAttribute('data-id')
  const {data} = await axios.get(prefix + '/users/' + id)

  const favorites = data.favorites
  const following = data.user.following

  let length = following.length > 5 ? 5 : following.length
  for (let i = 0; i < length; i++) {
    const li = document.createElement('li')
    li.setAttribute('data-id', following[i]._id)
    li.textContent = following[i].name
    followList.append(li)
  }
  let li = document.createElement('li')
  li.innerHTML = '<a href="#">More...</a>'
  followList.append(li)

  length = favorites.length > 5 ? 5 : favorites.length
  for (let i = 0; i < length; i++) {
    const li = document.createElement('li')
    li.setAttribute('data-id', favorites[i]._id)
    li.textContent = favorites[i].restaurant.name
    favoritesList.append(li)
  }
  li = document.createElement('li')
  li.innerHTML = '<a href="#">More...</a>'
  favoritesList.append(li)
  attachListeners()
}

function attachListeners() {
  document.querySelectorAll('#main-list a, #favorites-list a, #following-list a').forEach(a => {
    a.onclick = () => {
      openCloseMenu()
    }
  })
}



function openCloseMenu() {
  userMenu.classList.toggle('active')
  const nav = document.querySelector('.nav')
  if (userMenu.classList.contains('active')) {
    fetchInfos()
    nav.style.zIndex = 20
  } else {
    const timeoutId = setTimeout(() => {
      nav.style.zIndex = 1
      clearTimeout(timeoutId)
    }, 300)
  }
}