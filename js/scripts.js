let pokemonList = [
    {
        name: "Squirtle",
        height: 0.8,
        weight: 9,
        type: ["water"]
    },

    {
        name: "Charmander",
        height: 1.0,
        weight: 10,
        type: ["fire"]
    },

    {
        name: "Bulbasaur",
        height: 0.6,
        weight: 9,
        type: ["grass, poison"]
    },

    {
        name: "Pikachu",
        height: .05,
        weight: 6,
        type: ["electirc"]
    }
];

// iterates through the pokemonlist Array and finds which pokemon is bigger than 8
for (let i = 0; i < pokemonList.length; i++) {

    if (pokemonList[i].weight > 8) {
        document.write(pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ', ' + 'Weight: ' + pokemonList[i].weight + ')' + ' This pokemon is heavy. ');
    } else {
        document.write(pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ', ' + 'Weight: ' + pokemonList[i].weight + ')' + ' This pokemon is light. ');
    }
}