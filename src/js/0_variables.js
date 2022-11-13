'use strict';

console.log('hola');

const listCharacteres = document.querySelector('.js-section-list');
const btnSearch = document.querySelector('.js-btn');
const input = document.querySelector('.js-input');
const listFav = document.querySelector('.js-fav-list');

let characteres = [];
let favouriteCharacteres = [];

fetch('https://breakingbadapi.com/api/characters')
  .then((response) => response.json())
  .then((dataResult) => {
    characteres = dataResult;
    paintcharacteres(characteres);
  });

function paintcharacteres(paint) {
  for (const item of paint) {
    const liElement = document.createElement('li');
    const articleElement = document.createElement('article');
    liElement.setAttribute('class', 'article');
    liElement.setAttribute('class', 'js-li');
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
    descElement.appendChild(descText);
    articleElement.appendChild(descElement);
    liElement.appendChild(articleElement);
    listCharacteres.appendChild(liElement);
    // en este orden he creado con DOM mi lista: creo liElement, creo articleElement, creo img
    // y le añado su src con parametro item.img y creo su alt con descripcion por si no carga la img
    // meto la img dentro de articleElement. creo h2 y creo su txto de dentro y lo meto
    // y a su vez meto h2 entero dentro de article . Y lo mismo con el parrafo
    // y por ultimo meto article dentro de li y el li dentro de mi const del ul traido del HTML
  }
  addEventListenerFavs();
}
function paintcharacteresfav(paint) {
  listFav.innerHTML = '';
  for (const item of paint) {
    const liElement = document.createElement('li');
    const articleElement = document.createElement('article');
    liElement.setAttribute('class', 'article');
    liElement.setAttribute('class', 'js-li');
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
    descElement.appendChild(descText);
    articleElement.appendChild(descElement);
    liElement.appendChild(articleElement);
    listFav.appendChild(liElement);
  }
}
// esta funcion la meto en el evento click search para que la busqueda la hagan desde la api, y vuelvo a
// usar la funcion de pintar para crear el listado con la nueva info
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

// funcion manejadora del boton buscar
function handleSearch(ev) {
  ev.preventDefault();
  resultApi();
}
// para seleccionar y pintar fav
function handleClickFav(event) {
  event.currentTarget.classList.toggle('selected');
  const selectedId = characteres.find(
    (item) => item.char_id === parseInt(event.currentTarget.id)
  );
  console.log(selectedId);
  favouriteCharacteres.push(selectedId);
  console.log(favouriteCharacteres);
  paintcharacteresfav(favouriteCharacteres);
}

// ENVENTOS
function addEventListenerFavs() {
  const favItems = document.querySelectorAll('.js-li');
  for (const eachFavItem of favItems) {
    eachFavItem.addEventListener('click', handleClickFav);
  }
  // por cada cosa de mi lista eschucha mi click
}
btnSearch.addEventListener('click', handleSearch);
