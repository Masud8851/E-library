const displayAll = document.getElementById('display');

// Search Book from JSON
const searchBook = () => {
    const input = document.getElementById('input');
    const searchText = input.value;
    input.value = '';
    if (searchText.length == '') {
        // For Empty Search
        const booksCount = document.getElementById('count');
        booksCount.textContent = '';
        const error = document.createElement('h3');
        error.classList.add('error-message');
        error.innerText = `Please insert something!!!`;
        booksCount.appendChild(error);
        displayAll.textContent = '';

    } 
    else {
        fetch(`http://openlibrary.org/search.json?q=${searchText}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                totalBooks(data.num_found);
                displayBooks(data.docs);
            });
    }
}

// Count Total Books and Show Error Message whenever find nothing
const totalBooks = count => {
    const totalBook = document.getElementById('count');
    totalBook.textContent = '';
    const bookCount = document.createElement('h4');
    bookCount.classList.add('bookCount');
    if (count == 0) {
        bookCount.innerText = `No books are found! Try again.`;
    } else {
        bookCount.innerText = `Total Books Found : ${count}`;
    }
    totalBook.appendChild(bookCount);
}



// display All Results by Searching Book
const displayBooks = books => {
    displayAll.textContent = '';
    books.forEach(book => {
        // console.log(book);
        const div = document.createElement('div');
        div.innerHTML = `
                <div class="col">
                    <div class="card h-100">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" height="600vh"  class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <h6>Author Names:${book.author_name}</h6>
                            <h6>First Publish Year:${book.first_publish_year}</h6>
                        </div>
                        <div class="card-footer">
                            <button onclick="authorDetails('${book.author_key}')" class="text-end rounded">Author Details</button>
                        </div>
                    </div>
                 </div>
        `;
        displayAll.appendChild(div);
    });
}

const authorDetails = (authhorKey) => {
    fetch(`https://openlibrary.org/authors/${authhorKey}.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
}