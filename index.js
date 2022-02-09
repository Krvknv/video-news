const container = document.querySelector(".main");
const input = document.querySelector(".form__text");
const formBtn = document.querySelector(".form__btn");

const urlFilms =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=909b615c77f69f86a40d7cc3a1d0d8cc";
async function getData() {
  const res = await fetch(urlFilms);
  const data = await res.json();

  console.log(data);
  data.results.forEach((item) => {
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
          <img
            src="https://image.tmdb.org/t/p/w1280/${item.poster_path}"
            alt="image"
          />
        </div>
        <div class="card__info">
          <h2>${item.original_title}</h2>
          <div style="color: ${color};" class="mark">${item.vote_average}</div>
        </div>
      </div>`;
    // console.log(item.overview);
    container.append(div);
  });
}
getData();

const urlFind = "https://api.themoviedb.org/3/search/movie?query=";
input.focus();
async function makeSearch(e) {
  let word = input.value;
  if (word) {
    const url = `${urlFind}${word}&api_key=909b615c77f69f86a40d7cc3a1d0d8cc`;
    const res = await fetch(url);
    const data = await res.json();
    container.innerHTML = "";
    data.results.forEach((item) => {
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
          <img
            src="https://image.tmdb.org/t/p/w1280/${item.poster_path}"
            alt="image"
          />
        </div>
        <div class="card__info">
          <h2>${item.original_title}</h2>
          <div style="color: ${color};" class="mark">${item.vote_average}</div>
        </div>
      </div>`;
      // console.log(item.overview);
      container.append(div);
    });
  }
}

formBtn.addEventListener("click", makeSearch);
input.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    makeSearch();
  }
});
