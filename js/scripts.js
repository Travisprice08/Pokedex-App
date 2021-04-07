// IIFE repository
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokeDexBtn = document.getElementById('pokedex-button');

  function add(pokemon) {
    if (typeof (pokemon) ==='object' &&
       'name' in pokemon &&
       'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('Error, could not locate Pokemon data.');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function buttonListener (button, poke) {
    button.addEventListener('click', function () {
      showdetails(pokemon);
    });
  }

  function addListItem (pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokedex-button');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
  }

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
      showModal(pokemon);
    });
  }

  // both show and hide modal functions

  function showModal(pokemon) {
  let modalContainer = document.querySelector('.modal');
  //modalContainer.classList.add('is-visible');
  let modalTitle = document.querySelector('.modal-title');
  let pokeModalBody = document.querySelector('.modal-body');

  modalTitle.innerText = '';
  pokeModalBody.innerText = '';

  let pokeName = document.createElement('h2');
  pokeName.innerText = pokemon.name;

  let pokeImg = document.createElement('img');
  pokeImg.classList.add('')
  pokeImg.src = pokemon.imageUrl;

  let heightDetail = document.createElement('p');
  heightDetail.innerText = 'height: ${pokemon.height}';

  modalTitle.appendChild(pokemon.name);
  pokeModalBody.appendChild(heightDetail);
};



document.querySelector('button').addEventListener('click', () => {
  showModal();
});


  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    addButtonListener: buttonListener,
    showDetails: showDetails,
    showModal: showModal
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

//pokemon function added from IIFE public function to access from outside
