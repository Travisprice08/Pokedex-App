// IIFE repository
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let searchField = document.querySelector('#pokedex-search');


  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof (pokemon) ==='object' &&
       'name' in pokemon &&
       'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('Error, could not locate Pokemon data.');
    }
  }

  //Creating list and buttons
  function addListItem(pokemon) {
   let container = $('.list-group');
   let listItem = $(
     '<li class="pokemon-list-item pokemon-list-item-action"></li>'
   );
   const button = $(
     '<button type="button" class="btn-block pokedex-button" data-toggle="modal" data-target="#pokeModal">' +
       pokemon.name +
       '</button>'
   );
   container.append(listItem);
   listItem.append(button);
   clickPokemonButtonHandler(button, pokemon);
 }
 function clickPokemonButtonHandler(button, pokemonObject) {
   button.on('click', function (event) {
     // TODO: clear modal data
     console.log('click', pokemonObject);
     showDetails(pokemonObject);
   });
 }
  //Get list of pokemon from api
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //Gets details of pokemon
  function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e) {
    console.error(e);
    });
  }

  function showDetails(pokemon) {

    loadDetails(pokemon).then(function () {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      let modalHeader = $('.modal-header');

      modalTitle.empty();
      modalBody.empty();

      let pokeName = $('<h1>' + pokemon.name + '</h1>');
      let pokeImage = $('<img class="modal-img" style="width:50%">');
      pokeImage.attr('src', pokemon.imageUrl);
      let pokeHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');

      modalTitle.append(pokeName);
      modalBody.append(pokeImage);
      modalBody.append(pokeHeight);
    });
  }

  searchField.addEventListener ('input', function(){

    let pokeList = document.querySelectorAll('.pokemon-list-item');
    let filterValue = searchField.value.toUpperCase();


    pokeList.forEach(function(pokemon){
      console.log(pokemon.innerText);
      if(pokemon.innerText.toUpperCase().indexOf(filterValue) > -1){
        pokemon.style.display = '';
      }else{
        pokemon.style.display = 'none';
      }
    })
  });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails

  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

//pokemon function added from IIFE public function to access from outside
