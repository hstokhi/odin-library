
let library = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        if (this.read) {
            return `${title} by ${author}, ${pages} pages, Read`
        } else {
            return `${title} by ${author}, ${pages} pages, Unread`
        }
    }
}

function addBookToLibrary(title, author, pages, read) {
    library.push(new Book(title, author, pages, read))
}

const container = document.querySelector('.container')

function displayLibrary() {
    clearBox(container)
    for (let i = 0; i < library.length; i++) {
        const div = document.createElement('div')
        container.appendChild(div)
        div.dataset.arrayIndex = i
        div.textContent = library[i].info()

        const readButton = document.createElement('button')
        const removeButton = document.createElement('button')
        div.appendChild(readButton)
        div.appendChild(removeButton)
        readButton.textContent = 'Read/Unread'
        readButton.classList.add('read-unread')
        readButton.addEventListener('click', () => {
            console.log(library[div.dataset.arrayIndex])
            library[div.dataset.arrayIndex].toggleRead()
            displayLibrary()
            console.log(library[div.dataset.arrayIndex])
        })
        removeButton.textContent = 'Remove from Library'
        removeButton.classList.add('remove-button')
        removeButton.addEventListener('click', () => {
            console.log(library)
            library.splice(div.dataset.arrayIndex, 1)
            displayLibrary()
            console.log(library)
        })

    }    
}

displayLibrary()
closeForm()

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
    displayLibrary()
}

document.getElementById('submit-form').addEventListener('click', (event) => {
    event.preventDefault()
    submitForm()
    document.querySelectorAll('input').forEach(input => input.value = "")
    document.querySelectorAll('input[name="read"]').forEach(radio => radio.checked = false)
    closeForm()
})

const removeFromLibrary = function(index) {
    library.splice(index, 1)
    displayLibrary()
}
Book.prototype.toggleRead = function() {
    this.read = !this.read
}
/* Didn't end up using this part of the code but keeping for learning purposes 

let removeButtons = document.querySelectorAll('.remove-button')
removeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        console.log(library[button.dataset.arrayIndex])
        removeFromLibrary(button.dataset.arrayIndex)
        })
    })

let readButtons = document.querySelectorAll('.read-unread')
readButtons.forEach((button) => {
    button.addEventListener('click', () => {
        console.log(library[button.parentNode.dataset.arrayIndex].read)
        let index = button.parentNode.dataset.arrayIndex
        if (library[index].read == false) {library[index].read = true} else {library[index].read = false}
        console.log(library[button.parentNode.dataset.arrayIndex].read)
        displayLibrary()
    })
})*/