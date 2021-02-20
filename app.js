//Get api url
const base_url = "https://api.jikan.moe/v3";

class searchManga {
  constructor(){
    this.getElements();
    this.fetchMangaData();
    searchManga.displayManga();
  }

  getElements(){
  this.searchForm = document.getElementById('search-form');
  this.selectedLimit = document.getElementById('limit');
  this.selectedGenre = document.getElementById('genre');
  this.searchBtn = document.getElementById('search-btn');
  this.searchInput = document.getElementById('search-input');
  }

  //Fetch Manga Data
  fetchMangaData (){
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
        .then(searchManga.displayManga)
        .catch(err=>console.warn(err.message));
      }
      })
  }

  //UI
  static displayManga(items) { //data --> res.json()の内容
    console.log(items);
    let output = '<div class="row">';
    items.results.forEach(item => {
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
      addBtn.addEventListener('click', Fake.displayname)
});
  }
}

////////////以下お気に入りリスト///////////////////

class Manga {
  constructor(image, title, link) {
    this.image = image;
    this.title = title;
    this.link = link;
  }
}

class Fake {
  static displayname() {
    const books = 'えへへ'
    console.log(books);
  }
}

class UI {
  static displayBooks() {
    const books = Storage.getBooks();
    books.forEach((book)=> UI.addBooksToList(book));
  }

}

class Storage {
  static getBooks() {
    let books;
    //  getItem() メソッドはキーの名称を渡すと、そのキーに対する値を返します。
    if(localStorage.getItems('books') === null) {
      books = [];
    } else {
      // JSON.parse() メソッドは文字列を JSON として解析し、文字列によって記述されている JavaScript の値やオブジェクトを構築する
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books;
  }

  static addBooksToList(book){
    const books = Storage.getBooks();//booksが返る
    books.push(book);
    //JavaScript のオブジェクトや値を JSON 文字列に変換します。
    localStorage.setItem('books', JSON.stringify(books));
  }

}

/////////////  Eventまとめ   ///////////////




// ロード時にAppクラスをインスタンス化する。
window.addEventListener('load', () => new searchManga());




