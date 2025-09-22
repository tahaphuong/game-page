window.onload = start

let list = document.getElementById('main-list')
let loadButton = document.getElementById('load-button')
let loadButtonCon = document.getElementById('load-button-container')
let arr = [
  {
    "background_image": "https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg",
    "name": "Game 1",
    "rating": "3.5",
    "genres": [{"name": "Action", "name": "Adventure"}]
  },
  {
    "background_image": "https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg",
    "name": "Game 2",
    "rating": "4.7",
    "genres": [{"name": "Action"}]
  },
  {
    "background_image": "https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg",
    "name": "Game 3",
    "rating": "5.0",
    "genres": [{"name": "Comedy"}]
  }
]
let page = 1

async function start() {
  list.innerHTML = 'loading...'
  loadButton.style.display = 'none'
  try {
    // arr = await getData(page)
    loadButton.style.display = 'flex'
    list.innerHTML = ''
    for (let item of arr) {
      list.innerHTML += gameItem(item)
    }
  } catch(e) {
    list.innerHTML = e.message
  }

  loadButton.onclick = loadMore  
}

async function loadMore() {
  loadButtonCon.innerHTML = `<ion-icon id="load-icon" name="refresh-circle-outline"></ion-icon>`
  page += 1;
  let arr2 = await getData(page)
  for (let item of arr2) {
    list.innerHTML += gameItem(item)
  }
  loadButtonCon.innerHTML = `<button id="load-button" onclick="loadMore()" type="button">Load more</button>`
}

async function getData(page) {
  let arr = []
  await fetch('https://api.rawg.io/api/games?page_size=18&page=' + String(page))
    .then(res => res.json())
    .then(data => { arr = data.results })
    .catch(e => console.error(e))
  return arr
}

function gameItem(data) {
  return `
  <div class="game-item" style="background-image: url('${data.background_image}');">
          <div class="game-item-filter">
            <div class="game-name">${data.name}</div>
            <div class="game-info">
              <ion-icon class="star-icon" name="star"></ion-icon> ${data.rating} - ${data.genres.map(e=>e.name).join(', ')}</div>
            </div>
          </div>
        </div>`
}
