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
  function addListItem (pokemon) {
    let container = document.querySelector('.list-group');
    //let pokemonList = document.querySelector('#pokemon-list');
    let listPokemon = document.createElement('li');
    listPokemon.classList.add('pokemon-list-item');
    listPokemon.classList.add('pokemon-list-item-action');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokedex-button');
    button.classList.add('btn-block');
    button.setAttribute('data-toggle', '#pokeModal');
    button.setAttribute('data-target', 'modal');
    listPokemon.appendChild(button);
    container.appendChild(listPokemon);
    button.addEventListener('click', function () {
      showDetails(pokemon);
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
    //showModal: showModal
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

//pokemon function added from IIFE public function to access from outside
