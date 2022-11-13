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

let savedFavourites = JSON.parse(localStorage.getItem('favoroutecharacteres'));
//  con esto siempre SIEMPRE te traes la info pero ahora decides que hacer con ella con in if. te dice que cuando cargues la pagina me traigas la info guardada en localstorage, pero siempre hay que decirle que si no hay informacion pues nada, pero que si hay informacion ( !==null) osea que si es diferente a null pues que me pases esa lista a mi array de favourites y que me lo pintes nada mas arrancar
if (savedFavourites !== null) {
    favouriteCharacteres = savedFavourites;
    paintcharacteresfav(favouriteCharacteres);
}




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

  const testerFavIndex = favouriteCharacteres.findIndex(
    (item) => item.char_id === parseInt(event.currentTarget.id)
  );
  //    hazme un recorrido por todo favoritos y me traes Esto, pero no lo Pintes. luego lo uso para saber si me lo ha traido no me lo traigas mas. // seunda opcion es poner index que lo que me devuelve es solo la posicion del array en el que esta, pero que si no esta me da -1 asi me funciona tanto para pintar si es -1 como para quitar 1 en la posicion que yo diga que siempre sera indexof
  if (testerFavIndex === -1) {
    favouriteCharacteres.push(selectedId);
    localStorage.setItem(
      'favoroutecharacteres',
      JSON.stringify(favouriteCharacteres)
    );
    // cada veaz que yo haga push en un favorito nuevo lo guardo en localstorege indicando un nombre q yo quiera y el contenido que quiero guardar pero ese contenido se lo tengo que pasar en texto y por eso el stringity. y lo mismo al usar splice.
  }
  // si testerfav ESTA en favoritos esta condicion no se ejecuta. solo se ejecuta si si terterfav es falsa, si no esta. // Y luego hemo smejorado la funcion con indexof para ponerle la concicion de si es -1 es que no esta, po lo cual lo metes. si tester es -1 es que al hacerme el barrido no esta, polo cual lo metes.
  else {
    favouriteCharacteres.splice(testerFavIndex, 1);
    // y si terster si esta me das su posicion del array para quitarlo.  aqui esta diciendo que empieza en testerindex que es una posicion del array, y el segundo parametro es cuantos me tiene que quitar, en este caso 1.
    localStorage.setItem(
      'favoroutecharacteres',
      JSON.stringify(favouriteCharacteres)
    );
  }
  // si no esta lo meto si si esta lo quito

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
