//Object array
let pokemonList = [
    {
      name: 'Bulbasaur',
      height: '3',
      type: ['Grass','Poison']
    },
    {
      name: 'Charmander',
      height: '2',
      type: 'Fire'
    },
    {
      name: 'Squirtle',
      height: '1',
      type: 'Water'
    },
  ];
// IIFE repository
let pokemonRepository = (function () {
  return {
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function() {
      return pokemonList;
    },
    addListItem: function(pokemon){

    }
  }
})();

//add function
pokemonRepository.add({ name: 'Pikachu', height: 1, type: 'Electric'});
console.log(pokemonRepository.getAll() );

function showdetails(pokemon) {
  console.log(pokemon)
}
//pokemon function added from IIFE public function to access from outside
pokemonRepository.getAll().forEach(function(pokemon)  {
  let pokemonList = document.querySelector('.pokemon-list');
  let listPokemon = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('pokedex-button');
  listPokemon.appendChild(button);
  pokemonList.appendChild(listPokemon);
  button.addEventListener('click', function () {
    showdetails(pokemon);
  });

});
