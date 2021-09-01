// Give Error message for empty search
document.getElementById('error-message').style.display = 'none';
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    
    // clear data
    searchField.value = '';

    // Handle empty search request
    if (searchText == '') {
        // please write something to display

        displayError();
    }
    else{
        fetch(`http://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs));
    }  
}

const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('book-numbers').textContent = '';
    document.getElementById('book-details').textContent = '';

}

const displaySearchResult = books => {
    console.log(books);
    const searchResult = document.getElementById('search-result');
    books.forEach(book => {
        const div = document.createElement('div');
        div.innerHTML= `
        <div class="col">
            <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="">${book.title}</h5>
                <p class="card-text">${book.author_name}</p>
                <p class="card-text">${book.publish_date}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
        </div>
        `
        searchResult.appendChild(div);
    });
}




