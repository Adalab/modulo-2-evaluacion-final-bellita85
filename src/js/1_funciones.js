'use strict';

function paintcharacteres(paint) {
  listCharacteres.innerHTML = '';
  for (const item of paint) {
    const liElement = document.createElement('li');
    const articleElement = document.createElement('article');
    liElement.setAttribute('class', 'article js-li');
    liElement.setAttribute('id', item.char_id); //gancho
    const imgElem = document.createElement('img');
    imgElem.setAttribute('src', item.img);
    imgElem.setAttribute('class', 'img');
    imgElem.setAttribute('alt', 'characteres Breakin Bad');
    articleElement.appendChild(imgElem);
    const titleElement = document.createElement('h2');
    const titleText = document.createTextNode(item.name);
    titleElement.appendChild(titleText);
    articleElement.appendChild(titleElement);
    const descElement = document.createElement('p');
    const descText = document.createTextNode(item.status);
    const categoryElement = document.createElement('p');
    const categoryText = document.createTextNode(item.category);
    categoryElement.appendChild(categoryText);
    descElement.appendChild(descText);
    articleElement.appendChild(categoryElement);
    articleElement.appendChild(descElement);
    liElement.appendChild(articleElement);
    listCharacteres.appendChild(liElement);
    liElement.addEventListener('click', handleClickFav);

    const colors = favouriteCharacteres.findIndex(
      (actor) => actor.char_id === item.char_id
    );
    if (colors !== -1) {
      liElement.classList.add('selected');
    } else {
      liElement.classList.remove('selected');
    }
  }
}
function paintcharacteresfav(paint) {
  listFav.innerHTML = '';
  for (const item of paint) {
    const liElement = document.createElement('li');
    const articleElement = document.createElement('article');
    liElement.setAttribute('class', 'article');
    liElement.setAttribute('class', 'selected');
    const imgElem = document.createElement('img');
    imgElem.setAttribute('src', item.img);
    imgElem.setAttribute('class', 'img');
    imgElem.setAttribute('alt', 'characteres Breakin Bad');
    articleElement.appendChild(imgElem);
    const titleElement = document.createElement('h2');
    const titleText = document.createTextNode(item.name);
    titleElement.appendChild(titleText);
    articleElement.appendChild(titleElement);
    const descElement = document.createElement('p');
    const descText = document.createTextNode(item.status);
    descElement.appendChild(descText);
    const resetElement = document.createElement('p');
    const resetText = document.createTextNode('X');
    resetElement.appendChild(resetText);
    resetElement.setAttribute('class', 'reset');
    resetElement.setAttribute('id', item.char_id); //gancho
    articleElement.appendChild(descElement);
    articleElement.appendChild(resetElement);
    liElement.appendChild(articleElement);
    listFav.appendChild(liElement);
    resetElement.addEventListener('click', handleClickX);
  }
}
function localStorageSet() {
  localStorage.setItem(
    'favoroutecharacteres',
    JSON.stringify(favouriteCharacteres)
  );
}
function handleClickFav(event) {
  event.currentTarget.classList.toggle('selected');
  const selectedId = characteres.find(
    (item) => item.char_id === parseInt(event.currentTarget.id)
  );
  const testerFavIndex = favouriteCharacteres.findIndex(
    (item) => item.char_id === parseInt(event.currentTarget.id)
  );
  if (testerFavIndex === -1) {
    favouriteCharacteres.push(selectedId);
    localStorageSet();
  } else {
    favouriteCharacteres.splice(testerFavIndex, 1);
    localStorageSet();
  }
  paintcharacteresfav(favouriteCharacteres);
}

// TODO LO NECESARIO PARA EL BOTON BUSCAR PERSONAJES
function handleSearch(ev) {
  ev.preventDefault();
  resultApi();
}
function resultApi() {
  let characteresSearch = [];
  listCharacteres.innerHTML = '';
  fetch(`https://breakingbadapi.com/api/characters?name=${input.value}`)
    .then((response) => response.json())
    .then((data) => {
      characteresSearch = data;
      paintcharacteres(characteresSearch);
    });
}
btnSearch.addEventListener('click', handleSearch);

// TODO LO NECESARIO PARA EL BOTON LOG
function resultLog() {
  for ( const actor of characteres){
    console.log(actor.name);
  }
  
}
function handleClickLog (ev) {
  ev.preventDefault();
  resultLog ();
}
btnLog.addEventListener('click', handleClickLog);

///////////BONUS////

function handleClickX(event) {
  const testerFavReset = favouriteCharacteres.findIndex(
    (item) => item.char_id === parseInt(event.currentTarget.id)
  );
  favouriteCharacteres.splice(testerFavReset, 1);
  localStorageSet();
  paintcharacteresfav(favouriteCharacteres);
  resultApi();
}
function handleClickReset() {
  listFav.innerHTML = '';
  favouriteCharacteres = [];
  paintcharacteresfav(favouriteCharacteres);
  paintcharacteres(characteres);
  localStorageSet();
}
resetGlobal.addEventListener('click', handleClickReset);
