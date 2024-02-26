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
}

// localStorage.setItem("HANGOSKONYV_BOOKMARKS", "");
// Load storage
if (hasStorageSupport()) {
    var bookmarks = localStorage.getItem("HANGOSKONYV_BOOKMARKS");
    bookmarks = bookmarks ? JSON.parse(bookmarks) : [];
    console.log(bookmarks)

    var bookmarkContainer = document.querySelector(".bookmarkContainer")
    for (i in bookmarks) {
        if (document.querySelector("#audiobookName").innerHTML == bookmarks[i].name) {
            document.querySelector(".addBookmark").style.display = "none";
            document.querySelector(".removeBookmark").style.display = "block";
        }

        bookmarkContainer.innerHTML += '<a href="'+bookmarks[i].source+'"><article class="row">    <div class="col-4"><img class="w-100" src="'+bookmarks[i].img+'" alt=""></div>    <div class="col-8 my-auto">        <p>'+bookmarks[i].name+'</p>    </div></article></a>'
    }
}

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