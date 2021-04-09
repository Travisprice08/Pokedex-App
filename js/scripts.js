// IIFE repository
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokeDexBtn = document.getElementById('pokedex-button');
  let modal = document.getElementById('simpleModal');

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

  function addButtonListener (button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  //Creating list and buttons
  function addListItem (pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokedex-button');
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
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

  function hideModal() {
    let modalContainer = document.querySelector('#simpleModal');
    modalContainer.classList.remove('is-visible');
  }


  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // both show and hide modal functions

  function showModal(pokemon) {
  let modalContainer = document.querySelector('.modal');
  modalContainer.classList.add('is-visible');
  let modalTitle = document.querySelector('.modal-title');
  let pokeModalBody = document.querySelector('.modal-body');
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  // Listen for close Click
  let closeBtn = document.querySelector('.closeBtn');
  closeBtn.addEventListener('click', function () {
    document.querySelector('.modal').classList.remove('is-visible');
  });

  // Listen for ESC close
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#simpleModal');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // Listen for click outside of window to close
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //console.log('!!!' + pokeModalBody);
  modalTitle.innerText = pokemon.name;
  pokeModalBody.innerText = '';

  let pokeImg = document.createElement('img');
  pokeImg.src = pokemon.imageUrl;

  let heightDetail = document.createElement('p');
  heightDetail.innerText = `height: ${pokemon.height}`;

  pokeModalBody.appendChild(heightDetail);
  pokeModalBody.appendChild(pokeImg);
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
    addButtonListener: addButtonListener,
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
