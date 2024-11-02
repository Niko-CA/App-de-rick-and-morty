const characterList = document.getElementById("character-list");
const characterModal = document.getElementById("character-modal");
const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalInfo = document.getElementById("modal-info");
const closebtn = document.querySelector(".close");
const addFavorites = document.createElement("add-favorites");
const btnDelete = document.createElement("btn-delete");
console.log(localStorage.getItem("favorites"));

fetch("https://rickandmortyapi.com/api/character/")
.then((response) => response.json())
.then((characters) => {
    characters.results.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("character");
    card.innerHTML = `
    <img src="${element.image}" alt="${element.name}" >
    <p>${element.name}</p>
    <button class="favorites">add to favorites</button>
    `;

    characterList.appendChild(card);

      //selecciono la imagen a la que quiero aagregarle evento
    const image = card.querySelector("img");
      //const text = card.querySelector("p").textContent;

    image.addEventListener("click", () => {
        //necesito que al hacer click en la imagen, me muestre el modal
        modalImage.src = element.image;
        modalName.textContent = element.name;

        characterModal.style.display = "block";

        fetch(`https://rickandmortyapi.com/api/character/${element.id}`)
        .then((data) => data.json())
        .then((character) => {
            modalInfo.textContent = character.status + "-" + character.species;
        });
    });

    const favorites = card.querySelector(".favorites");
    favorites.addEventListener("click", () => {
        const favoritelist = [];
        const favoriteCharacter = {
        name: element.name,
        image: element.image,
        };
        favoritelist.push(favoriteCharacter);
        localStorage.setItem("favorites", JSON.stringify(favoritelist));
        console.log("agregado a favorites");
    });
    });
});

closebtn.addEventListener("click", () => {
characterModal.style.display = "none";
});