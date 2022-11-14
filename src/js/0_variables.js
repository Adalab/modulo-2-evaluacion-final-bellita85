'use strict';

const listCharacteres = document.querySelector('.js-section-list');
const btnSearch = document.querySelector('.js-btn');
const input = document.querySelector('.js-input');
const listFav = document.querySelector('.js-fav-list');

let characteres = [];
let favouriteCharacteres = [];

// ESTO PASA AL CARGAR LA PAGINA

fetch('https://breakingbadapi.com/api/characters')
  .then((response) => response.json())
  .then((dataResult) => {
    characteres = dataResult;
    paintcharacteres(characteres);
  });
let savedFavourites = JSON.parse(localStorage.getItem('favoroutecharacteres'));
//  con esto siempre SIEMPRE te traes la info pero ahora decides que hacer con ella. Si hay algo lo igualas con fav y lo pintas. si no no hagas nada
if (savedFavourites !== null) {
  favouriteCharacteres = savedFavourites;
  paintcharacteresfav(favouriteCharacteres);
}
// if (
//   favouriteCharacteres === characteres) {
// liElement.classList.add('selected');
//   }

// const filterFav = characteres.filter((item) => item.char_id === favouriteCharacteres.char_id)
