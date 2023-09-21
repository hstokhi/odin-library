
let library = []

const container = document.querySelector('.container')

const StorageController = class {
    add (key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    clear() {
        localStorage.clear()
    }

    get(key) {
        try {
            const storedLibrary = localStorage.getItem(key)
            JSON.parse(storedLibrary).forEach(book => {
            library.push(new Book(book.title, book.author, book.pages, book.read))})
        }
        catch(e) {
            console.log('Nothing in Local Storage. You may begin your library from scratch')
        }
        return library
    }

}

const storage = new StorageController()

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
        storage.add('library', library)
    }
}

const LibraryController = class {
    addBookToLibrary(title, author, pages, read) {
        library.push(new Book(title, author, pages, read))
        storage.add('library', library)
    }
    removeFromLibrary(index) {
        library.splice(index, 1)
        storage.clear()
        storage.add('library', library)
        formControl.displayLibrary(library)
    }
}

const librarian = new LibraryController()

const DisplayController = class {
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
            librarian.addBookToLibrary(document.getElementById('title').value, document.getElementById('author').value, document.getElementById('pages').value, true)
        } 
        else {
            librarian.addBookToLibrary(document.getElementById('title').value, document.getElementById('author').value, document.getElementById('pages').value, false)
        }
        
        this.displayLibrary(library)
    }
    
    submitButton() {
        document.querySelector('form').addEventListener('submit', (event) => {
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
    displayLibrary(list) {
        this.clearBox(container)

        for (let i = 0; i < list.length; i++) {
            const div = document.createElement('div')
            container.appendChild(div)
            div.dataset.arrayIndex = i
            div.textContent = list[i].info
    
            const readButton = document.createElement('button')
            const removeButton = document.createElement('button')
            div.appendChild(readButton)
            div.appendChild(removeButton)

            readButton.textContent = 'Read/Unread'
            readButton.classList.add('read-unread')
            readButton.addEventListener('click', () => {
                list[i].toggleRead()
                this.displayLibrary(list)
            })

            removeButton.textContent = 'Remove from Library'
            removeButton.classList.add('remove-button')
            removeButton.addEventListener('click', () => {
                librarian.removeFromLibrary(i)
            })
            
    
        }    
    }
}

const formControl = new DisplayController()
formControl.closeForm()
formControl.addButtonListener()
formControl.submitButton()
formControl.displayLibrary(storage.get('library'))
