'use strict';

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
    liElement.addEventListener('click', handleClickFav);
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
    resetElement.setAttribute('id', item.char_id);
    articleElement.appendChild(descElement);
    articleElement.appendChild(resetElement);
    liElement.appendChild(articleElement);
    listFav.appendChild(liElement);
    resetElement.addEventListener('click', handleClickX);
  }
}
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
    // event.currentTarget.classList.add('selected');
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
  const resetGlobal = document.querySelector('.js-reset');
  resetGlobal.addEventListener('click', handleClickReset);
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

///////////BONUS////

function handleClickX(event) {
  const testerFavReset = favouriteCharacteres.findIndex(
    (item) => item.char_id === parseInt(event.currentTarget.id)
  );
  favouriteCharacteres.splice(testerFavReset, 1);

  localStorage.setItem(
    'favoroutecharacteres',
    JSON.stringify(favouriteCharacteres)
  );
  paintcharacteresfav(favouriteCharacteres);
}

function handleClickReset() {
  listFav.innerHTML = '';
}

// ENVENTOS que no uso por usar dom avanzado y meterle el evento click a cada cosa
// function addEventListenerFavsReset() {
//   const xReset = document.querySelectorAll('.reset');
//   console.log(xReset);
//   for (const eachFavItem of xReset) {
//     eachFavItem.addEventListener('click', handleClickX);
//   }
// }
// function addEventListenerFavs() {
//   const favItems = document.querySelectorAll('.js-li');
//   for (const eachFavItem of favItems) {
//     eachFavItem.addEventListener('click', handleClickFav);
//   }
//   // por cada cosa de mi lista eschucha mi click ESTO YA NO LO USO POR QUE LE HE LLAMADO DESDE DOM AVANZADO
