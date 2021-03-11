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

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 2.5) {
      // you were trying to call name at height at the same time. These are seperate properties so you need to call them individually.
    console.log(pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ')'+ ' -' + " Wow, that's big!")
  }else if (pokemonList[i].height < 2.5 && pokemonList[i].height > 1.5) {
    console.log(pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ')')
  }else{
    console.log(pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ')')
  }
}
document.write(pokemonList);
