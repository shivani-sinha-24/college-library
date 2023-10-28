class Book{
    constructor(name, author, type){
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display{
    add(book){
        console.log('adding to ui');
        let tableBody = document.getElementById('tableBody');
        let uiString =`<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                       </tr>`;
        tableBody.innerHTML += uiString;

        saveBookToLS();
    };

    clear(book){
      let libraryForm = document.getElementById('libraryForm');
      libraryForm.reset();
    };

    validate(book){
        if(book.name.length<2 || book.author.length<2){
            return false;
        }
        else{
            return true;
        }
    };

    show(type, displayMessage){
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText='Success';
        }
        else{
            boldText='Error';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${boldText}:</strong> ${displayMessage}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
    
      setTimeout(function(){
          message.innerHTML = '';   
      }, 2000); 
    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e){
    e.preventDefault();
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let type;
    
    if(fiction.checked){
        type= fiction.value;
    }
    else if(programming.checked){
        type= programming.value;
    }
    else if(cooking.checked){
        type= cooking.value;
    }
    
    let book = new Book(name, author, type);
    console.log(book);
    
    // let libraryBooks = JSON.parse(localStorage.getItem("bookListLS"))
    // if(libraryBooks && libraryBooks.length){
    //     libraryBooks.push(book)
    // } else {
    //     libraryBooks = [ book ]
    // }
    // localStorage.setItem("bookListLS", JSON.stringify(libraryBooks))

    let display = new Display();
    if (display.validate(book)){
        
        display.add(book);
        display.clear(book);
        display.show('Success!','Your book has been successfully added');
    }
    else{
        //show error to the user
        display.show('Danger!','Sorry you cannot add this book');
        
    }
  
   
}


function saveBookToLS(){
    let bookListLS = localStorage.getItem('bookListLS');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let book = new Book(name, author, type);
    
    if(fiction.checked){
        type= fiction.value;
    }
    else if(programming.checked){
        type= programming.value;
    }
    else if(cooking.checked){
        type= cooking.value;
    }
    
    if(bookListLS===null){
        bookListObj = [];
    }
    else{
        bookListObj = JSON.parse(bookListLS);
    }
    
    let myObj = {
        name : name,
        author : author,
        type: type
    }
    bookListObj.push(myObj);
    localStorage.setItem('bookListLS', JSON.stringify(bookListObj));


    showBookList();

}

function showBookList(){
    
    // local storage se value nikalo
    let bookListLS = localStorage.getItem('bookListLS');
    bookListLS = JSON.parse(bookListLS)  //localstorage ka value ko parse krna pdta hai
    // phle ka saara element ko khali / delete kr do
    tableBody.innerHTML = ""

    // array me loop chala ke value show kara do
    bookListLS.forEach(function(element, index){
        let uiString =`<tr> <td>${element.name}</td><td>${element.author}</td><td>${element.type}</td> </tr>`
        tableBody.innerHTML += uiString;
        // saari rows append kara di gyi hai loop me har ek element se hote hue
    })
        
}

showBookList()