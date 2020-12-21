export class Doggo {
  constructor() {
    this.apiUrl = "https://dog.ceo/api";
    this.imgEl = document.querySelector(".featured-dog img");
    this.backgroundEl = document.querySelector(".featured-dog__background");
    this.tilesEl = document.querySelector(".tiles");
  }
  listBreeds() {
    return fetch(`${this.apiUrl}/breeds/list/all`)
      .then((res) => res.json())
      .then((data) => data.message);
  }

  getRandomImage() {
    return fetch(`${this.apiUrl}/breeds/image/random`)
      .then((res) => res.json())
      .then((data) => data.message);
  }

  getRandomImageByBreed(breed) {
    return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
      .then((resp) => resp.json())
      .then((data) => data.message);
  }
  init() {
    this.getRandomImage().then((imgSrc) => {
      this.imgEl.src = imgSrc;
      this.backgroundEl.style.background = `url(${imgSrc})`;
    });
    this.showAllBreeds();
  }
  addBreed(breed, subBreed) {
    let name;
    let type;
    if (typeof subBreed === "undefined") {
      name = breed;
      type = breed;
    } else {
      name = `${breed} ${subBreed}`;
      type = `${breed}/${subBreed}`;
    }
    const tile = document.createElement("div");
    tile.classList.add("tiles__tile");

    const tileContent = document.createElement("div");
    tileContent.classList.add("tiles__tile-content");

    tileContent.innerText = name;
    tileContent.addEventListener("click", () => {
      this.getRandomImageByBreed(type).then((imgSrc) => {
        this.imgEl.src = imgSrc;
        this.backgroundEl.style.background = `url(${imgSrc})`;
      });
    });
    tile.appendChild(tileContent);
    this.tilesEl.appendChild(tile);
  }
  showAllBreeds() {
    this.listBreeds().then((breeds) => {
      for (const breed in breeds) {
        if (breeds[breed].length === 0) {
          this.addBreed(breed);
        } else {
          for (const subBreed of breeds[breed]) {
            this.addBreed(breed, subBreed);
          }
        }
      }
    });
  }
}
