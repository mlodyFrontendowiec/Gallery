import "../sass/style.scss";
import { Doggo } from "./Doggo";

document.addEventListener("DOMContentLoaded", () => {
  const dogApi = new Doggo();
  dogApi.init();
});
