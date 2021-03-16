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

pokemonList.forEach(function(pokemon) {
  console.log(pokemon.name + ' Height: ' + pokemon.height + ' Type: ' + pokemon.type)
});
