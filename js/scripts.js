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
    }
  }
})();

//add function
pokemonRepository.add({ name: 'Pikachu', height: 1, type: 'Electric'});
console.log(pokemonRepository.getAll() );

//pokemon function added from IIFE public function to access from outside
pokemonList.forEach(function(pokemon) {
  document.write(pokemon.name + ' Height: ' + pokemon.height + ' Type: ' + pokemon.type + '<br>')
});
