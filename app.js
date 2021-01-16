/*やること-->入力がないときのアラート出す
*/

//Get api url
const base_url = "https://api.jikan.moe/v3";

const searchForm = document.getElementById('search-form');
const selectedLimit = document.getElementById('limit');
const selectedGenre = document.getElementById('genre');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

//Form Event Listener
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //search word
  const searchTerm = searchInput.value;
  // 定数searchTermの値がnullの場合はalert表示と、条件分岐をすることができそうですね
  console.log(searchTerm)

  fetch(`${base_url}/search/manga?q=${searchTerm}&page=1&genre_exclude=33,12,28,34,43&limit=${selectedLimit.value}`)
  .then(res=>res.json())
  .then(updateDOM)
  .catch(err=>console.warn(err.message));
})

//Update Dom
function updateDOM(data) { //data --> res.json()の内容
  console.log(data);
  let output = '<div class="row">';
  data.results.forEach(item => {
    output += `
      <div class="col-md-4" style="margin-bottom:4rem;">
      <h5 class="card-title">${item.title}</h5>
      <img src=${item.image_url}>
      <p class="card-text">${item.synopsis}.</p>
      <a class="btn btn-secondary" href="${item.url}" target="_blank">View Details</a>
      </div>
    `
  });
  output += `</div>`
  document.getElementById('search-results').innerHTML = output;

}

// const form = new FormData(this);
// const query = form.get("search");
