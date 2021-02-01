//Get api url
const base_url = "https://api.jikan.moe/v3";

class App {
  constructor(){

    this.getElements();
    this.submitKeyword();
    this.updateDOM();
  }

  getElements(){
  this.searchForm = document.getElementById('search-form');
  this.selectedLimit = document.getElementById('limit');
  this.selectedGenre = document.getElementById('genre');
  this.searchBtn = document.getElementById('search-btn');
  this.searchInput = document.getElementById('search-input');
  }

  //Form Event Listener
  submitKeyword (){
    this.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      //search word
      this.searchTerm = this.searchInput.value;
      // 定数searchTermの値がnullの場合はalert表示と、条件分岐をすることができそうですね
      if(this.searchTerm == "") {
        alert('キーワードを入力してください')
      } else {
        fetch(`${base_url}/search/manga?q=${this.searchTerm}&page=1&genre_exclude=33,12,28,34,43&limit=${this.selectedLimit.value}`)
        .then(res=>res.json())
        .then(updateDOM)
        .catch(err=>console.warn(err.message));
      }
      })
  }

  //Update Dom
  updateDOM(data) { //data --> res.json()の内容
    console.log(data);
    let output = '<div class="row">';
    data.results.forEach(item => {
      output += `
        <div class="col-md-4" style="margin-bottom:4rem;">
        <h5 class="card-title">${item.title}</h5>
        <img src=${item.image_url}>
        <p class="card-text">${item.synopsis}.</p>
        <a class="btn btn-secondary" href="${item.url}" target="_blank">View Details</a><button class="addBtn"> +</button>
        </div>
      `
    });
    output += `</div>`
    document.getElementById('search-results').innerHTML = output;

    const addBtn = document.querySelector('.addBtn')
    addBtn.addEventListener('click', ()=> {
    console.log('rika')
    })
  }
}




