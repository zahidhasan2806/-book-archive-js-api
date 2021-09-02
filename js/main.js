//Getting all elements

const searchField = document.getElementById("search-input");
const bookList = document.getElementById("book-list");
const searchNum = document.getElementById("search-num");
const nullError = document.getElementById("null-error")
const preLoader = document.getElementById("pre-loader");

// adding EventListener & fetching api 
const loadBooks = () => {
    const searchText = searchField.value;
    searchField.value = '';
    bookList.textContent = '';
    searchNum.innerText = '';
    nullError.innerHTML = '';

    // preLoader adding
    preLoader.classList.remove("d-none");
    const url = `http://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayBooks(data));
}

//getting data for UI
const displayBooks = (data) => {
    // filtering required data
    const books = data.docs.filter(item => item.title !== undefined && item.author_name !== undefined && item.first_publish_year !== undefined && item.publisher !== undefined && item.cover_i !== undefined);
    //showing numbers of results
    searchNum.innerText = `Books Found: ${books.length}/${data.numFound}`
    // error handling
    if (books.length === 0 && searchField.value === '') {
        preLoader.classList.add("d-none");
        nullError.innerHTML = `  <p class="text-danger text-center fs-5 fw-bold">Please! Type something valid .....</p>`;
        bookList.innerHTML = `<h3 class="fw-bold text-center">No book found!</h3>`
    } else {
        //showing data in UI
        preLoader.classList.add("d-none");
        nullError.innerHTML = '';
        books.forEach(book => {
            const div = document.createElement("div");
            div.classList.add("col-md-4")
            div.innerHTML = `
            <div class="card rounded" style = "width: 18rem; min-height:450px;" >
                <img style="height: 200px;" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                    <div class="card-body" >
                        <h3 class="card-title">${book.title}</h3>
                        <p class="card-text"><span class='fw-bold'>Author Name:</span> ${book.author_name[0]}</p>
                        <p class="card-text"><span class='fw-bold'>First Publish Year:</span> ${book.first_publish_year}</p>
                        <p class="card-text"><span class='fw-bold'>Publisher Name:</span>: ${book.publisher[0]}</p>
                    </div>
                </div>`
            bookList.appendChild(div);
        })
    }
}