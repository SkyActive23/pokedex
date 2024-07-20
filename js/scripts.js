let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1125';

    // pulls information from the pokemonlist
    function getAll() {
        return pokemonList;
    }

    // adds new pokemon to the pokemon list
    function add(pokemon) {
        // input must be an object
        if (typeof pokemon === 'object' &&
            'detailsUrl' in pokemon
        ) {
            pokemonList.push(pokemon)
        } else {
            return document.write(' (' + pokemon.name + ' Needs more information!) ')
        }
    }

    // function that allows to find specific Pokémon only by name
    function pokemonSearch(searchName) {
        // Clear the all the buttons on the page when user types in search box
        $('.list-group').empty();

        // Add pokemon buttons for which the name includes the search string
        pokemonList.forEach((pokemon) => {
            if (pokemon.name.toLowerCase().includes(searchName.toLowerCase())) {
                addListItem(pokemon);
            }
        })
    }

    // Other functions remain here
    function loadList() {
        showLoadingSpinner();
        return fetch(apiUrl).then(function (response) {
            hideLoadingSpinner();
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
            hideLoadingSpinner();
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        showLoadingSpinner();
        return fetch(url).then(function (response) {
            hideLoadingSpinner();
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.type = [];
            details.types.forEach(function (element) {
                item.type.push(element.type.name);
            })
        }).catch(function (e) {
            hideLoadingSpinner();
            console.error(e);
        });
    }

    // function to show loading animation when loading pokemon details
    function showLoadingSpinner() {
        let loadingContainer = document.querySelector('#loading-container');

        // Clear preexisting content
        loadingContainer.innerHTML = '';

        // Add spinner element
        let spinner = document.createElement('div');
        spinner.classList.add('spinner');
        loadingContainer.appendChild(spinner);

        // make container and spinner visible
        loadingContainer.classList.add('is-visible');
    }

    // function to hide loading animation when loading pokemon details
    function hideLoadingSpinner() {
        let loadingContainer = document.querySelector('#loading-container');
        loadingContainer.classList.remove('is-visible');
    }


    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    // creates list item and text and then appends them to the ul in the HTML.
    function addListItem(pokemon) {
        let pokemonItem = document.querySelector('.list-group');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerHTML = pokemon.name;
        button.classList.add('btn-primary');
        listItem.classList.add('group-list-item')
        button.classList.add('btn');
        listItem.appendChild(button);
        pokemonItem.appendChild(listItem);
        button.addEventListener('click', function () {
            showDetails(pokemon)
        })
    }

    function showModal(pokemon) {
        // showModal function
        let modalTitle = $('.modal-title'); // modalTitle
        let modalBody = $('.modal-body'); // modalBody
        // let modalHeader = $(".modal-header"); // no header so removed

        modalTitle.empty(); // clears the modalTitle after display
        modalBody.empty(); // clears the modalBody after display


        let pokemonName = $('<h2 class="text-capitalize">' + pokemon.name + '</h2>');

        let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');

        let pokemonWeight = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

        let pokemonType = $('<p class="text-capitalize">' + 'Type: ' + pokemon.type.join(', ') + '</p>');

        // creating img in modal content
        let pokemonImage = $('<img class="modal-img" style="width:50%">');
        pokemonImage.attr('src', pokemon.imageUrl);

        modalTitle.append(pokemonName); // pokemonName is displayed as the title in the modal
        modalBody.append(pokemonHeight); // pokemonHeight is displayed in the body of the modal
        modalBody.append(pokemonWeight); // pokemonWeight is displayed in the body of the modal
        modalBody.append(pokemonType); // pokemonWeight is displayed in the body of the modal
        modalBody.append(pokemonImage); // pokemonImage is displayed in the body of the modal
    }


    return {
        // refers to getAll function
        getAll: getAll,

        // refers to add function
        add: add,

        // refers to addListItems function
        addListItem: addListItem,

        // refers to loadList function
        loadList: loadList,

        // refers to loadDetails function
        loadDetails: loadDetails,

        // refers to pokemonSearch function
        pokemonSearch: pokemonSearch

    };
})();

// foreach loop accesses the key name of each objects and prints their value.
pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});




