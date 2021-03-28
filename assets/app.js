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
       iChooseYou(preLoaded[i]);
    }
  }
  pokeLocations = pokemon;
  availablePokemon();
}

function populate(newGame) {
  window.location.hash = newGame;
  game[0] = newGame;
  availablePokemon();
}

// Now this one is FUCKED UP, essentially I need to generate a list of all the available pokemon, based on the chosen game, and I have chosen to NOT make 20+ seperate JSON files for each game because that would be far more redundant than this generator:
function availablePokemon() {
  var available = $.grep(pokeLocations.pokemon, function (element, index) {
    for (var i = 0; i < element.versions.length; i +=1) {
      if (element.versions[i].name == game[0]) {
        return element.versions[i].name;
      }
    }
  });
  for (var i = 0; i < available.length; i += 1) {
    $(".available").append("<input type=\"checkbox\" id=\"" + available[i].name + "Choice\" name=\"available\" value=\"" + available[i].name + "\" onclick=\"iChooseYou(value)\"><label for=\"" + available[i].name + "Choice\"> " + available[i].name + "<br>");
  }
}

function iChooseYou(choice) {
  $(".selected").append("<input type=\"checkbox\" id=\"" + choice + "Chosen\" name=\"selected\" value=\"" + choice + "\"><label for=\"" + choice + "Chosen\"> " + choice + "<br>");
  $("#" + choice + "Choice").hide();
}
