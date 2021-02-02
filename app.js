//Get api url
const base_url = "https://api.jikan.moe/v3";

class App {
  constructor(){
    this.getBookInfo = this.getBookInfo.bind(this);

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
      // when searchTerm is null, show alert
      if(this.searchTerm == "") {
        alert('キーワードを入力してください')
      } else {
        fetch(`${base_url}/search/manga?q=${this.searchTerm}&page=1&genre_exclude=33,12,28,34,43&limit=${this.selectedLimit.value}`)
        .then(res=>res.json())
        .then(this.updateDOM)
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
        <a class="btn btn-secondary" href="${item.url}" target="_blank">View Details</a><button class="addBtns"> +</button>
        </div>
      `
    });
    output += `</div>`
    document.getElementById('search-results').innerHTML = output;

    const addBtns = document.querySelectorAll('.addBtns')
    addBtns.forEach(addBtn => {
      addBtn.addEventListener('click', this.getBookInfo)
      //book informationをreturnする？
    })
  }

  getBookInfo(){
    //上の情報を持って来れるのか・・？
    //情報を取得して、localstorageに保存したい
    console.log('rika');
  }

  //上でゲットした情報をUIにupdateする
  updateListDOM(){

  }

  //xボタンでbook informationを削除する
  deleteBook(){

  }

}

// ロード時にAppクラスをインスタンス化する。
window.addEventListener('load', () => new App());




