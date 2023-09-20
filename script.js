
let library = []

const container = document.querySelector('.container')

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
        this.libraryController = new LibraryController();
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
        if (document.getElementById('yes').checked === true) {
            this.libraryController.addBookToLibrary(document.getElementById('title').value, document.getElementById('author').value, document.getElementById('pages').value, true)
        } 
        else {
            this.libraryController.addBookToLibrary(document.getElementById('title').value, document.getElementById('author').value, document.getElementById('pages').value, false)
        }
        this.displayLibrary()
    }
    
    submitButton() {
        document.getElementById('submit-form').addEventListener('click', (event) => {
        event.preventDefault()
        this.submitForm()
        document.querySelectorAll('input').forEach(input => input.value = "")
        document.querySelectorAll('input[name="read"]').forEach(radio => radio.checked = false)
        this.closeForm()
        })
    }

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
                library[div.dataset.arrayIndex].toggleRead()
                this.displayLibrary()
            })
            removeButton.textContent = 'Remove from Library'
            removeButton.classList.add('remove-button')
            removeButton.addEventListener('click', () => {
                library.splice(div.dataset.arrayIndex, 1)
                this.displayLibrary()
            })
    
        }    
    }
}

const formControl = new DisplayController()
formControl.closeForm()
formControl.addButtonListener()
formControl.submitButton()