
let library = []
const container = document.querySelector('.container')
/*function Book(title, author, pages, read) {
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
}*/

const Book = class {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }

    get info() {
        if (this.read) {
            return `${this.title} by ${this.author}, ${this.pages} pages, Read`
        } else {
            return `${this.title} by ${this.author}, ${this.pages} pages, Unread`
        }
    }

    toggleRead () {
        this.read = !this.read
    }
}
//have to create an instance of the class before I can use the functions//
const LibraryController = class {
    addBookToLibrary(title, author, pages, read) {
    library.push(new Book(title, author, pages, read))
    }
    removeFromLibrary = function(index) {
    library.splice(index, 1)
    displayLibrary()
}
}

const DisplayController = class {
    constructor() {
        this.libraryController = new LibraryController()
    }
    openForm() {
        document.querySelector('.form-container').style.display = 'block'
    }
    
    closeForm() {
        document.querySelector('.form-container').style.display = 'none'
    }
    
    addButtonListener() {
        document.querySelector('.header>button').addEventListener('click', (event) => {
        if (document.querySelector('.form-container').style.display === 'none') {
            this.openForm()
        } else {this.closeForm()}
    })}
    
    submitForm() {
        if (document.querySelector('input[name="read"]:checked').value == 'yes') {
            this.libraryController.addBookToLibrary(document.getElementById('title').value, document.getElementById('author').value, document.getElementById('pages').value, true)} 
            else {this.libraryController.addBookToLibrary(document.getElementById('title').value, document.getElementById('author').value, document.getElementById('pages').value, false)}
        this.displayLibrary()
    }
    
    submitButton() {
        document.getElementById('submit-form').addEventListener('click', (event) => {
        event.preventDefault()
        this.submitForm()
        document.querySelectorAll('input').forEach(input => input.value = "")
        document.querySelectorAll('input[name="read"]').forEach(radio => radio.checked = false)
        this.closeForm()
    })}

    clearBox() {
        while(container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
    displayLibrary() {
        this.clearBox(container)
        for (let i = 0; i < library.length; i++) {
            const div = document.createElement('div')
            container.appendChild(div)
            div.dataset.arrayIndex = i
            div.textContent = library[i].info
    
            const readButton = document.createElement('button')
            const removeButton = document.createElement('button')
            div.appendChild(readButton)
            div.appendChild(removeButton)
            readButton.textContent = 'Read/Unread'
            readButton.classList.add('read-unread')
            readButton.addEventListener('click', () => {
                console.log(library[div.dataset.arrayIndex])
                library[div.dataset.arrayIndex].toggleRead()
                this.displayLibrary()
                console.log(library[div.dataset.arrayIndex])
            })
            removeButton.textContent = 'Remove from Library'
            removeButton.classList.add('remove-button')
            removeButton.addEventListener('click', () => {
                console.log(library)
                library.splice(div.dataset.arrayIndex, 1)
                this.displayLibrary()
                console.log(library)
            })
    
        }    
    }
}

const formControl = new DisplayController()
formControl.closeForm()
formControl.addButtonListener()
formControl.submitButton()

/*function displayLibrary() {
    clearBox(container)
    for (let i = 0; i < library.length; i++) {
        const div = document.createElement('div')
        container.appendChild(div)
        div.dataset.arrayIndex = i
        div.textContent = library[i].info

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
}*/

/*function clearBox(container) {
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
}*/

/*function openForm() {
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
})*/


/*Book.prototype.toggleRead = function() {
    this.read = !this.read
}*/

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