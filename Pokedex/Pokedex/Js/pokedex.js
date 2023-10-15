window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    if (localStorage.getItem("token")) {
        headers = {
            Authorization: "Bearer " + localStorage.getItem("token")
        };
        loadPokemon();
    } else {
        window.location.href = "index.html";
    }
}

function loadPokemon() {
    axios.get(url + "/pokemon", { headers: headers })
        .then(function(res) {
            console.log(res);
            displayPokemon(res.data.message);
        })
        .catch(function(err) {
            console.log(err);
        });
}
function displayPokemon(pokemon){
    var body = document.querySelector("body");
    //vamos a obetner del body de pokedex
    for(var i =0; i<pokemon.length; i++){
        body.innerHTML += `<h3>${pokemon[i].pok_name} </h3>`;
    }

}