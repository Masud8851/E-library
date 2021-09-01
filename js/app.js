const details = document.getElementById('details');
const displayAll = document.getElementById('display');



// Get Fetch JSON Data
const searchBook = () => {
    const input = document.getElementById('input');
    const searchText = input.value;
    input.value = '';
    if (searchText.length == '') {
        // For Empty Input
        const countSection = document.getElementById('count');
        countSection.textContent = '';
        const h5 = document.createElement('h5');
        h5.classList.add('text-center');
        h5.innerText = `Somthing Error Try Again!`;
        countSection.appendChild(h5);
        displayAll.textContent = '';

    } else {
        fetch(`http://openlibrary.org/search.json?q=${searchText}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                count(data.num_found);
                displayBooks(data.docs);
            });
    }
}

// Count Total Result and Error Message
const count = (count) => {
    const countSection = document.getElementById('count');
    countSection.textContent = '';
    const h5 = document.createElement('h5');
    h5.classList.add('text-center');
    if (count == 0) {
        h5.innerText = `Sorry! We can't found any Book,Please try with Correct name.`;
    } else {
        h5.innerText = `Total Book Found : ${count}`;
    }
    countSection.appendChild(h5);
}



// display All Results of Book
const displayBooks = (books) => {
    displayAll.textContent = '';
    books.forEach(book => {
        // console.log(book);
        const div = document.createElement('div');
        div.innerHTML = `
                <div class="col">
                    <div class="card h-100">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" height="600vh"  class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <h6>Author Names:${book.author_name}</h6>
                            <h6>Publish Date:${book.publish_date}</h6>
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