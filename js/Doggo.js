export class Doggo {
  constructor() {
    this.apiUrl = "https://dog.ceo/api";
    this.imgEl = document.querySelector(".featured-dog img");
    this.backgroundEl = document.querySelector(".featured-dog__background");
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
    this.listBreeds().then((breeds) => console.log(breeds));
  }
}
