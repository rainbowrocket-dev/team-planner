// Runs at beginning
$( document ).ready(function() {
  // Get game version through browser hash
  game = location.hash.substring(1);
  game = game.split("+");
  // Create all games array - future games will have to be added to both this array and as an option as a form in "/index.html"
  var games =  ["red", "green", "blue", "yellow", "gold", "silver", "crystal", "ruby", "sapphire", "emerald", "firered", "leafgreen", "diamond", "pearl", "platinum", "heartgold", "soulsilver", "black", "white", "black2", "white2", "x", "y", "omegaruby", "alphasapphire", "sun", "moon", "ultrasun", "ultramoon", "sword", "shield"];
  // Throw error if the given hash is not a game option, quit setting up site
  if($.inArray(game[0], games) == -1) {
    console.error("Error: hash not accepted");
    return;
  }
  // Load the JSON file
  $.getJSON("/pokemon/assets/pokelocations.json", function(data) {
    initialLoad(data);
  });
});

function initialLoad(pokemon) {
  //This bad boy loads in the pokemon based on the url:
  if (game.length > 1) {
    preLoaded = game;
    preLoaded.shift();
    // For amount of pokemon in url up to 6
    for (var i = 0; i < preLoaded.length && i < 6; i += 1) {
      // Adding all Pokemon in the url, going to have to double check this against the JSON later on but I don't have that made yet; right now it just tosses them in the dom
       $(".team").append(preLoaded[i]);
    }
  }
  pokeLocations = pokemon;
  availablePokemon();
}

function populate(newGame) {
  window.location.hash = newGame;
  game[0] = newGame;
  console.log(pokeLocations);
}

// Now this one is FUCKED UP, essentially I need to generate a list of all the available pokemon, based on the chosen game, and I have chosen to NOT make 20+ seperate JSON files for each game because that would be far more redundant than this generator:
function availablePokemon() {
  console.log(pokeLocations);
  var available = $.grep(pokeLocations.pokemon, function (element, index) { // AYO THIS SHIT BROKEN <--------- bc JSON is not correctly mADE DUMBASS
    if (element.version[0] == game[0]) {
      return element.version[0];
    }
  });
  console.log(available);
  $(".available").append(available[0].name);
}
