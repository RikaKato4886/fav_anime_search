//Get api url
const base_url = "https://api.jikan.moe/v3";

const searchForm = document.getElementById('search-form');
const selectedLimit = document.getElementById('limit');
const selectedGenre = document.getElementById('genre');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

/*やること-->入力がないときのアラート出す

*/

//Form Event Listener
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //search word
  const searchTerm = searchInput.value;
  console.log(searchTerm)
  //`${base_url}/search/manga?q=${searchTerm}&page=1
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
      <div class="col-md-4">
      <h5 class="card-title">${item.title}</h5>
      <img src=${item.image_url}>
      <p class="card-text">${item.synopsis}.</p>
      <a class="btn btn-secondary" href="${item.url}">View Details</a>
      </div>
    `
  });
  output += `</div>`
  document.getElementById('search-results').innerHTML = output;
}






// const form = new FormData(this);
// const query = form.get("search");


// function updateDom(data){

//表示するところ

//     const animeByCategories = data.results
//         .reduce((acc, anime)=>{

//             const {type} = anime;
//             if(acc[type] === undefined) acc[type] = [];
//             acc[type].push(anime);
//             return acc;

//         }, {});

//         searchResults.innerHTML = Object.keys(animeByCategories).map(key=>{

//             const animesHTML = animeByCategories[key]
//             .sort((a,b)=>a.episodes-b.episodes)
//             .map(anime=>{
//                 return `
//                     <div class="card">
//                         <div class="card-image">
//                             <img src="${anime.image_url}">
//                         </div>
//                         <div class="card-content">
//                             <span class="card-title">${anime.title}</span>
//                             <p>${anime.synopsis}</p>
//                         </div>
//                         <div class="card-action">
//                             <a href="${anime.url}">Find out more</a>
//                         </div>
//                     </div>
//                 `
//             }).join("");


//             return `
//                 <section>
//                     <h3>${key.toUpperCase()}</h3>
//                     <div class="kemicofa-row">${animesHTML}</div>
//                 </section>
//             `
//         }).join("");
// }

// function pageLoaded(){
//     const form = document.getElementById('search_form');
//     form.addEventListener("submit", searchAnime);
// }


// window.addEventListener("load", pageLoaded);
