/* Get elements*/

const container = document.querySelector(".main");
const input = document.querySelector(".form__text");
const formBtn = document.querySelector(".form__btn");

const KEY_API = "909b615c77f69f86a40d7cc3a1d0d8cc";
const URL_FILMS = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=`;
const URL_FIND = "https://api.themoviedb.org/3/search/movie?query=";

/* Creat functions*/

function createElements(item) {
  let color;
  if (item.vote_average < 5) {
    color = "red";
  } else if (item.vote_average >= 5 && item.vote_average < 8) {
    color = "orange";
  } else if (item.vote_average >= 8) {
    color = "blue";
  }
  let div = document.createElement("div");
  div.innerHTML = `<div class="card">
          <div class="card__description">
          <h3>Overview</h3>
          <p>${item.overview}</p>
        </div>
        <div class="card__photo">
          <img ${
            item.poster_path
              ? `src = https://image.tmdb.org/t/p/w1280/${item.poster_path}`
              : `src = ./assets/img/notFoundPoster.jpg`
          }
            
            alt="image"
          />
        </div>
        <div class="card__info">
          <h2>${
            item.original_title.length <= 40
              ? `${item.original_title}`
              : `${item.original_title.slice(0, 40)}...`
          }</h2>
          <div style="color: ${color};" class="mark">${item.vote_average}</div>
        </div>
      </div>`;
  return div;
}

async function getData() {
  const res = await fetch(`${URL_FILMS}${KEY_API}`);
  const data = await res.json();

  data.results.forEach((item) => {
    const div = createElements(item);
    container.append(div);
  });
}

async function makeSearch(e) {
  let word = input.value;
  if (word) {
    const url = `${URL_FIND}${word}&api_key=${KEY_API}`;
    const res = await fetch(url);
    const data = await res.json();
    container.innerHTML = "";
    if (data.results.length) {
      data.results.forEach((item) => {
        const div = createElements(item);
        container.append(div);
      });
    } else {
      let img = new Image();
      img.src = "./assets/png/bg-error.png";
      container.append(img);
    }
  }
}

window.onload = function () {
  input.focus();
  getData();
};

formBtn.addEventListener("click", makeSearch);
input.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    makeSearch();
  }
});
