const modalBtn = document.getElementById('user');
const userMenu = document.getElementById('user-menu')
const prefix = 'http://localhost:5000'

modalBtn.addEventListener('click', () => {
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
})

async function fetchInfos() {
  const followList = document.getElementById('following-list')
  const favoritesList = document.getElementById('favorites-list')
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
  li.innerHTML = '<li><a href="#">More...</a></li>'
  followList.append(li)

  length = favorites.length > 5 ? 5 : favorites.length
  for (let i = 0; i < length; i++) {
    const li = document.createElement('li')
    li.setAttribute('data-id', favorites[i]._id)
    li.textContent = favorites[i].restaurant.name
    favoritesList.append(li)
  }
  li = document.createElement('li')
  li.innerHTML = '<li><a href="#">More...</a></li>'
  favoritesList.append(li)
}
