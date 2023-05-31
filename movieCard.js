const movieForm = document.querySelector(".search-form");
const movieInput = document.querySelector(".search-form input");
const movieList = document.querySelector(".movie-list");

// movie Arr
let movieData = [];

// 공백제거 정규식
let check = /\s/g;

// movie api get
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODRmMGQzNjkzMGUyZjY2YTdmZWVhYzkzNDc0YjM4ZCIsInN1YiI6IjY0NzA5OTVlYzVhZGE1MDBkZWU2ZTIwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mKGZTBAKP7Rc6hN_FfIWU1JfRGwCnF8fdtbGPCN-v3A",
  },
};

window.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response.results);
      movieData = response.results;

      // 검색 버튼 클릭 함수
      function movieSubmit(e) {
        e.preventDefault();

        // 카드 리스트 초기화
        movieList.innerHTML = "";

        // 변수에 검색값 저장
        let getMovie = movieInput.value;
        // 공백제거, 소문자 변환하여 movieGet 함수로 파라미터 전달
        if (getMovie.match(check)) {
          getMovie = getMovie.replace(check, "").toLowerCase();
          movieGet(getMovie);
        } else {
          getMovie = getMovie.toLowerCase();
          movieGet(getMovie);
        }

        // 인풋 초기화
        movieInput.value = "";
      }

      // 영화 검색 버튼 이벤트
      movieForm.addEventListener("submit", movieSubmit);

      // 영화 검색
      function movieGet(getMovie) {
        // const li = document.createElement("li");
        // const img = document.createElement("img");
        // const h3 = document.createElement("h3");
        const p = document.createElement("p");
        // const button = document.createElement("button");

        movieData.forEach((a, i) => {
          // console.log(newMovie);
          // console.log(a.title.replace(check, "").toLowerCase());

          // console.log(a.title.length);

          // 영화 제목 공백체크 및 소문자로 변경
          // 검색 기능
          if (a.title.replace(check, "").toLowerCase().includes(getMovie)) {
            // li.setAttribute("class", "movie-card");
            // img.setAttribute("class", "card-img");
            // h3.setAttribute("class", "card-title");
            // p.setAttribute("class", "card-content");
            // button.setAttribute("class", "card-button");

            // li.append(img);
            // li.append(h3);
            // li.append(p);
            // li.append(button);

            // 이미지 주소
            // img.src = `https://image.tmdb.org/t/p/original${a.backdrop_path}`;
            // 영화 제목 텍스트 추가
            // h3.innerText = `${a.title}`;

            // 영화 설명 길이 체크
            // 영화 설명 텍스트 추가
            if (a.overview.length > 300) {
              let content = a.overview.substring(0, 300);
              p.innerText = `${content}......`;
            } else {
              p.innerText = `${a.overview}`;
            }

            // movie card 추가
            let tempHtml = `<li class="movie-card">
                              <img
                                class="card-img"
                                src="https://image.tmdb.org/t/p/original${a.backdrop_path}"
                                alt="사진"
                              />
                              <h3 class="card-title">${a.title} (${a.vote_average})</h3>
                              <p class="card-content">${p.innerText}
                              <button class="card-button"">더보기</button></p>
                            </li>`;

            // foreach 구문안인데도 append 메소드가 한번밖에 실행이 안되어
            // insertAdjacentHTML 메소드를 사용함
            // movieList.append(li);

            movieList.insertAdjacentHTML("beforeend", tempHtml);

            // 영화 설명 더보기 버튼
            // 더보기 기능 추가하려고 해보았으나 생성된 버튼을 특정 하는것에
            // 실패하여 jquery로 구현
            // btn = document.querySelectorAll(".card-button");
            // btn[i].addEventListener("click", function (e) {
            //   e.currentTarget.parentElement.innerText = `${a.overview}`;
            // });

            // jquery 사용하여 더보기 기능 구현
            btn = $(".card-button");
            btn.on("click", function (e) {
              e.currentTarget.parentElement.innerText = `${a.overview}`;
            });
          }
        });
      }
    })
    .catch((err) => console.error(err));
});
