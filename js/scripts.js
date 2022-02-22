let pokemonRepository = (function () {

    let pokemonList = []
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // pulls information from the pokemonlist
    function getAll() {
        return pokemonList;
    }

    // adds new pokemon to the pokemon list
    function add(pokemon) {
        // input must be an object
        if (typeof pokemon === "object" &&
            "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon)
        } else {
            return document.write(" (" + pokemon.name + " Needs more information!) ")
        }
    }

    // Other functions remain here
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
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    // creates list item and text and then appends them to the ul in the HTML.
    function addListItem(pokemon) {
        let pokemonItem = document.querySelector(".pokemon-list");
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerHTML = pokemon.name;
        button.classList.add("button");
        listItem.appendChild(button);
        pokemonItem.appendChild(listItem);
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }


    return {
        // refers to getAll function
        getAll: getAll,

        // refers to add function
        add: add,

        // refers to addListItems
        addListItem: addListItem,

        // refers to loadList
        loadList: loadList,

        // refers to loadDetails
        loadDetails: loadDetails
    };
})();

// foreach loop accesses the key name of each objects and prints their value.
pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


// iterates through the pokemonlist Array and finds which pokemon is bigger than 8
// for (let i = 0; i < pokemonList.length; i++) {

//     if (pokemonList[i].weight > 8) {
//         document.write(pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ', ' + 'Weight: ' + pokemonList[i].weight + ')' + ' This pokemon is heavy. ');
//     } else {
//         document.write(pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ', ' + 'Weight: ' + pokemonList[i].weight + ')' + ' This pokemon is light. ');
//     }
// }




