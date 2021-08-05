const modalBtn = document.getElementById('user');
const userMenu = document.getElementById('user-menu')
const prefix = 'http://localhost:5000'

modalBtn.addEventListener('click', () => {
  userMenu.classList.toggle('active')

  if (userMenu.classList.contains('active')) {
    fetchInfos()
  }

  const nav = document.querySelector('.nav')
  nav.style.zIndex = 0
  if (nav.style.zIndex == 0) {
    nav.style.zIndex = 20
  } else {
    nav.style.zIndex = 0
  }
})

async function fetchInfos() {
  const id = modalBtn.getAttribute('data-id')
  const {data} = await axios.get(prefix + '/users/' + id)
  const favorites = data.favorites
  const user = data.user
  const following = user.following
  let length = following.length > 5 ? 5 : following.length
  let list = document.getElementById('following-list')
  for (let i = 0; i < length; i++) {
    const li = document.createElement('li')
    li.setAttribute('data-id', following[i]._id)
    li.textContent = following[i].name
    list.append(li)
  }

  length = favorites.length > 5 ? 5 : favorites.length
  list = document.getElementById('favorites-list')
  for (let i = 0; i < length; i++) {
    const li = document.createElement('li')
    li.setAttribute('data-id', favorites[i]._id)
    li.textContent = favorites[i].restaurant.name
    list.append(li)
  }
}
