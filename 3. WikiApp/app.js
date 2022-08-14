// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error-msg");
const resultsDisplay = document.querySelector(".results-display");
const loader = document.querySelector(".loader");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  if (input.value === "") {
    errorMsg.textContent = "Wops, veuillez entrer un terme de recherche";
    return; /* return permet de sortir de la fonction */
  } else {
    errorMsg.textContent = "";
    loader.style.display = "flex;"; /* on affiche le loader */
    resultsDisplay.textContent = ""; /* on vide le resultsDisplay */
    wikiApiCall(input.value);
  }
}

async function wikiApiCall(searchInput) {

    try {
    /* on essaye de faire la requête */

    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
    ); /* fetch permet de faire une requête HTTP */


    if(!response.ok) {
        throw new Error('${response.status}')
    }

    console.log(response);

} catch (error) {
  /* on catch les erreurs */
  errorMsg.textContent = `${error}`; /* on affiche un message d'erreur */
  loader.style.display = "none"; /* on cache le loader */
}
}
    const data =
      await response.json(); /* on récupère les données de la réponse */


    createCards(data.query.search); /* on crée les cartes */

function createCards(data) {
  if (!data.length) {
    /* si la longueur de data est égale à 0 */
    errorMsg.textContent =
      "Wopsy, aucun résultat"; /* on affiche un message d'erreur */
      loader.style.display = "none";
    return;
  }

  data.forEach((el) => {
    /* pour chaque item de data */
    const url = `https://en.wikipedia.org/wiki/${el.pageid}`; /* on crée une url */
    const card = document.createElement("div"); /* on crée un élément div */
    card.className = "result-item"; /* on lui donne la classe result_item */
    card.innerHTML = `
        <h3 class="result-title">
        <a href=${url} target="_blank">${el.title}</a> </h3>  /* on crée un lien vers l'url de l'article */
        <a href=${url} class="result-link" target="_blank"> // on crée un lien vers l'url de l'article */
        <span class="result-snippet">${el.snippet}</span> /* on crée un span avec le texte de l'article */
        <br>
        `;
    resultsDisplay.appendChild(card); /* on ajoute le card au resultsDisplay */
  });
  loader.style.display = "none"; /* on cache le loader */
}
