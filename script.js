
let library = [new Book('giving tree', 'shel', 50, true), new Book('pachinko', 'lee', 360, true), new Book('eragon', 'someone', 400, false)]

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

function addBookToLibrary(title, author, pages, read) {
    library.push(new Book(title, author, pages, read))
}

const container = document.querySelector('.container')

function displayLibrary(library) {
    clearBox(container)
    for (let i = 0; i < library.length; i++) {
        const div = document.createElement('div')
        container.appendChild(div)
        div.dataset.arrayIndex = i
        div.textContent = library[i].info()

        const button = document.createElement('button')
        const removeButton = document.createElement('button')
        div.appendChild(button)
        div.appendChild(removeButton)
        button.textContent = 'Read/Unread'
        button.classList.add('read-unread')
        removeButton.textContent = 'Remove from Library'
        removeButton.classList.add('remove-button')
        removeButton.dataset.arrayIndex = i
    }    
}

function clearBox(container) {
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function openForm() {
    document.querySelector('.form-container').style.display = 'block'
}

function closeForm() {
    document.querySelector('.form-container').style.display = 'none'
}

document.querySelector('.header>button').addEventListener('click', (event) => {
    if (document.querySelector('.form-container').style.display === 'none') {
        openForm()
    } else {closeForm()}
})

function submitForm() {
    if (document.querySelector('input[name="read"]:checked').value == 'yes') {
        addBookToLibrary(document.getElementById('title').value, document.getElementById('author').value, document.getElementById('pages').value, true)} 
        else {addBookToLibrary(document.getElementById('title').value, document.getElementById('author').value, document.getElementById('pages').value, false)}
    displayLibrary(library)
}

document.getElementById('submit-form').addEventListener('click', (event) => {
    event.preventDefault()
    submitForm()
    closeForm()
})

function removeFromLibrary(index) {
    library.splice(index, 1)
    displayLibrary(library)
}
document.querySelectorAll('.remove-button').forEach( (button) => {
    button.addEventListener('click', removeFromLibrary(button.dataset.arrayIndex))
})

document.querySelectorAll('.read-unread').forEach( (button) => {
    button.addEventListener('click', (event) => {
        let index = button.parentNode.dataset.arrayIndex
        if (library[index].read == false) {library[index].read = true} else { library[index].read = false}
        displayLibrary(library)
    })
})

displayLibrary(library)
closeForm()