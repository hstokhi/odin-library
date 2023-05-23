
let library = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        if (read) {
            return `${title} by ${author}, ${pages} pages, read`
        } else {
            return `${title} by ${author}, ${pages} pages, not read yet`
        }
    }
}

function addBookToLibrary() {
    const title = prompt('Title:')
    const author = prompt('Author:')
    const pages = parseInt(prompt('Number of pages:'))
    if (prompt("Read? (Yes or No):").toLowerCase() == "yes") {
        let read = true
    } else {let read = false}

    library.push(new Book(title, author, pages, read))
}

const container = document.querySelector('.container')
function displayLibrary() {
    library.forEach()
}