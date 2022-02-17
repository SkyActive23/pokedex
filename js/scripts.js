let pokemonRepository = (function () {

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
            height: 0.5,
            weight: 6,
            type: ["electirc"]
        }
    ]

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === "object") {
            if (Object.keys(pokemon)[0] === 'name' &&
                Object.keys(pokemon)[1] === 'height' &&
                Object.keys(pokemon)[2] === 'weight' &&
                Object.keys(pokemon)[3] === 'type') {
                pokemonList.push(pokemon);
            } else {
                return document.write(pokemon.name + " Needs more information! ")
            }

        }
    }

    return {
        // refers to getAll function
        getAll: getAll,

        // refers to add function
        add: add
    };
})();




pokemonRepository.add({
    name: "Caterpie",
    height: 0.4,
    weight: 3,
    type: ["bug"]
});
pokemonRepository.add({
    name: "Weedle",
    height: 0.4,
    weight: 3,
    type: ["bug, poison"]
});
pokemonRepository.add({
    name: "Meowth",
    height: 0.6,
    weight: 5,
    type: ["normal"]
});
pokemonRepository.add({
    name: "Mew",
    height: 0.5,
    weight: 6,
    type: ["psychic"]
});
pokemonRepository.add({
    name: "Mewtwo",
    height: 1.0,
    weight: 10,
    type: ["psychic"]
});

pokemonRepository.add({
    name: "Dratini",
});

pokemonRepository.add({
    name: "Pidgey"
})

pokemonRepository.getAll().forEach(function (pokemon) {
    document.write(" (" + pokemon.name + ": height- " + pokemon.height + " weight- " + pokemon.weight + " type- " + pokemon.type + ")");
});

// iterates through the pokemonlist Array and finds which pokemon is bigger than 8
// for (let i = 0; i < pokemonList.length; i++) {

//     if (pokemonList[i].weight > 8) {
//         document.write(pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ', ' + 'Weight: ' + pokemonList[i].weight + ')' + ' This pokemon is heavy. ');
//     } else {
//         document.write(pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ', ' + 'Weight: ' + pokemonList[i].weight + ')' + ' This pokemon is light. ');
//     }
// }




