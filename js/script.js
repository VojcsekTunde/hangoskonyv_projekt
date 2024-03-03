function hasStorageSupport() {
    return typeof(Storage) !== "undefined";
}

/*
function setStorage(name, value) {
    if (hasStorageSupport()) {

    }
}
*/

function setBookmark(bookmark) {
    if (hasStorageSupport()) {
        var bookmarks = localStorage.getItem("HANGOSKONYV_BOOKMARKS");
        bookmarks = bookmarks ? JSON.parse(bookmarks) : [];
        var removed = false
        for (i in bookmarks) {
            if (bookmarks[i].name == bookmark.name) {
                bookmarks.splice(i, 1);
                removed = true
            }
        }
        if (!removed) {
            bookmarks.push(bookmark);
        }
        console.log(bookmarks)
        localStorage.setItem("HANGOSKONYV_BOOKMARKS", JSON.stringify(bookmarks));

        return removed
    }
}

function addToCart() {
    alert("Add To Cart");
}

// Load storage
function updatePage() {
    if (hasStorageSupport()) {
        var bookmarks = localStorage.getItem("HANGOSKONYV_BOOKMARKS");
        bookmarks = bookmarks ? JSON.parse(bookmarks) : [];
        console.log(bookmarks)
    
        var bookmarkContainer = document.querySelector(".bookmarkContainer")
        bookmarkContainer.innerHTML = ""
        for (i in bookmarks) {
            if (document.querySelector("#audiobookName") && document.querySelector("#audiobookName").innerHTML == bookmarks[i].name) {
                document.querySelector(".addBookmark").style.display = "none";
                document.querySelector(".removeBookmark").style.display = "block";
            }
    
            bookmarkContainer.innerHTML += '<a href="'+bookmarks[i].source+'"><article class="row">    <div class="col-4"><img class="w-100" src="'+bookmarks[i].img+'" alt=""></div>    <div class="col-8 mb-auto mt-2">        <p>'+bookmarks[i].name+'</p>    </div></article></a>'
        }
    }
}
updatePage()

function addBookmark() {
    var bookmark = {
        name: document.querySelector("#audiobookName").innerHTML,
        img: document.querySelector("#audiobookImg").src,
        source: window.location.href
    };

    var removed = setBookmark(bookmark)
    if (!removed) {
        document.querySelector(".addBookmark").style.display = "none";
        document.querySelector(".removeBookmark").style.display = "block";
    } else {
        document.querySelector(".addBookmark").style.display = "block";
        document.querySelector(".removeBookmark").style.display = "none";
    }
    updatePage()
}

// localStorage.setItem("HANGOSKONYV_BOOKMARKS", "");

// Bootstrap validáció
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const mobileSearchInput = document.getElementById('mobileSearchInput');
const mobileSearchResults = document.getElementById('mobileSearchResults');

const sections = [
    { id: 'Fantasy-1', title: 'Fantasy-1 cím', page: 'audiobook1.html' },
    { id: 'Fantasy-2', title: 'Fantasy-2 cím', page: 'audiobook1.html' },
    { id: 'Gyerek-1', title: 'Gyerek-1 cím', page: 'audiobook1.html' },
    { id: 'Gyerek-2', title: 'Gyerek-2 cím', page: 'audiobook1.html' },
    { id: 'Ifjúsági-1', title: 'Ifjúsági-1 cím', page: 'audiobook1.html' },
    { id: 'Ifjúsági-2', title: 'Ifjúsági-2 cím', page: 'audiobook1.html' },
    { id: 'Szépirodalmi-1', title: 'Szépirodalmi-1 cím', page: 'audiobook1.html' },
    { id: 'Szépirodalmi-2', title: 'Szépirodalmi-2 cím', page: 'audiobook1.html'},
    { id: 'Ismeretterjesztő-1', title: 'Ismeretterjesztő-1 cím', page: 'audiobook1.html'},
    { id: 'Ismeretterjesztő-2', title: 'Ismeretterjesztő-2 cím', page: 'audiobook1.html'}];


function kisBetus() {
    const searchText = searchInput.value.toLowerCase();
    searchResults.innerHTML = '';

    if (searchText === '') {
        return;
    } 

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const titleText = section.title.toLowerCase();

        // Ha a címsor tartalmazza a keresési szöveget
        if (titleText.includes(searchText)) {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.innerHTML = section.title;
            link.href = section.page + '#' + section.id;  //h4 id
            li.appendChild(link);
            searchResults.appendChild(li);

        }
    }
}
searchInput.addEventListener('input', kisBetus);

