function hasStorageSupport() {
    return typeof(Storage) !== "undefined";
}

/*
function setStorage(name, value) {
    if (hasStorageSupport()) {

    }
}
*/

function addCart(book) {
    if (hasStorageSupport()) {
        var cart = localStorage.getItem("HANGOSKONYV_CART");
        cart = cart ? JSON.parse(cart) : [];
        var changed = false
        for (i in cart) {
            if (cart[i].name == book.name) {
                cart[i].quantity += book.quantity;
                changed = true;
            }
        }
        if (!changed) {
            cart.push(book);
        }

        console.log(cart);
        localStorage.setItem("HANGOSKONYV_CART", JSON.stringify(cart));
    }
}

function removeCart(bookName) {
    if (hasStorageSupport()) {
        var cart = localStorage.getItem("HANGOSKONYV_CART");
        cart = cart ? JSON.parse(cart) : [];
        for (i in cart) {
            if (cart[i].name == bookName) {
                cart.splice(i, 1);
            }
        }
        console.log(cart);
        localStorage.setItem("HANGOSKONYV_CART", JSON.stringify(cart));

        return cart.length
    }
}

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
        localStorage.setItem("HANGOSKONYV_BOOKMARKS", JSON.stringify(bookmarks));

        return removed
    }
}

// Load storage
function updatePage() {
    if (hasStorageSupport()) {
        var bookmarks = localStorage.getItem("HANGOSKONYV_BOOKMARKS");
        bookmarks = bookmarks ? JSON.parse(bookmarks) : [];
    
        var bookmarkContainer = document.querySelector(".bookmarkContainer")
        bookmarkContainer.innerHTML = ""
        for (i in bookmarks) {
            if (document.querySelector("#audiobookName") && document.querySelector("#audiobookName").innerHTML == bookmarks[i].name) {
                document.querySelector(".addBookmark").style.display = "none";
                document.querySelector(".removeBookmark").style.display = "block";
            }
    
            bookmarkContainer.innerHTML += '<a href="'+bookmarks[i].source+'"><article class="row">    <div class="col-4"><img class="w-100" src="'+bookmarks[i].img+'" alt=""></div>    <div class="col-8 mb-auto mt-2">        <p>'+bookmarks[i].name+'</p>    </div></article></a>'
        }

        var cart = localStorage.getItem("HANGOSKONYV_CART");
        cart = cart ? JSON.parse(cart) : [];

        var cartItems = document.querySelector(".cartItems tbody")
        if (cartItems) {
            total = 0
            if (cart.length > 0) {
                cartItems.innerHTML = ""
                for (i in cart) {
                    var book = cart[i];
                    total += book.price * book.quantity
                    console.log(book)
                    cartItems.innerHTML += '<tr id=item-'+i+'><th scope="row">'+(Number(i)+1)+'</th><td><img src="'+book.img+'" width="100" alt="'+book.name+'" title="'+book.name+'"><span class="name">'+book.name+'</span></td><td><div class="d-flex">'+(book.quantity > 1 ? '<button type="button" class="btn" onclick="changeQuantity('+i+', -1)">-</button>' : '')+'<span class="itemQuantity my-auto px-2">'+book.quantity+'</span>    <button type="button" class="btn" onclick="changeQuantity('+i+', 1)">+</button></div></td><td><span id="itemPrice">'+(book.price * book.quantity)+'</span> Ft</td><td><button class="removeItem" onclick="removeFromCart('+i+')"><i class="bi bi-x-lg"></i></button></td></tr>';
                }
            } else {
                document.querySelector(".cartItems").style.display = "none";
                document.querySelector(".cartNone").style.display = "block";
            }
            document.querySelector(".cartList #totalPrice").innerHTML = total
            document.querySelector(".cartList #finalPrice").innerHTML = total+300
        }
    }
}
updatePage()

function addToCart() {
    var book = {
        name: document.querySelector("#bookName").innerHTML,
        img: document.querySelector("#bookImg").src,
        price: Number(document.querySelector("#bookPrice").innerHTML),
        quantity: 1
    };

    addCart(book);

    var toastContainer = document.getElementById('addCartToast');
    var toast = bootstrap.Toast.getOrCreateInstance(toastContainer);
    toast.show();
}

function removeFromCart(i) {
    var item = document.querySelector(".cartItems #item-"+i);
    var name = document.querySelector(".cartItems #item-"+i+" .name").innerHTML;
    console.log(name)

    removeCart(name);
    item.remove()

    updatePage();

    var toastContainer = document.getElementById('removeCartToast');
    var toast = bootstrap.Toast.getOrCreateInstance(toastContainer);
    toast.show();
}

function changeQuantity(i, num) {
    var name = document.querySelector(".cartItems #item-"+i+" .name").innerHTML;
    var book = {name: name, quantity: num}
    addCart(book)

    updatePage();
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
        var toastContainer = document.getElementById('bookmarkToast');
        document.querySelector("#bookmarkToast p").innerHTML = 'A hangoskönyvet beraktuk a <a data-bs-toggle="offcanvas" href="#bookmarks" role="button" aria-controls="bookmarks">könyvjelzők</a> közt.'
        var toast = bootstrap.Toast.getOrCreateInstance(toastContainer);
        toast.show();
    } else {
        document.querySelector(".addBookmark").style.display = "block";
        document.querySelector(".removeBookmark").style.display = "none";
        var toastContainer = document.getElementById('bookmarkToast');
        document.querySelector("#bookmarkToast p").innerHTML = 'A hangoskönyvet kivettük a <a data-bs-toggle="offcanvas" href="#bookmarks" role="button" aria-controls="bookmarks">könyvjelzőkből</a>.'
        var toast = bootstrap.Toast.getOrCreateInstance(toastContainer);
        toast.show();
    }
    updatePage()
}

// localStorage.setItem("HANGOSKONYV_BOOKMARKS", "");
// localStorage.setItem("HANGOSKONYV_CART", "");

// Bootstrap validáció
var forms = document.querySelectorAll(".checkout-info");
function handleForm(event) { event.preventDefault(); } 
for (i = 0; i < forms.length; i++) {
  forms[i].addEventListener('submit', handleForm);
}

(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      } else {
          // alert("Minden OK")
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
    { id: 'Szépirodalmi-2', title: 'Szépirodalmi-2 cím', page: 'audiobook2.html'},
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

// KOMMENTELÉS
function addComment() {
    const nameInput = document.getElementById('name');
    const commentInput = document.getElementById('comment');

    const name = nameInput.value;
    const commentText = commentInput.value;

    // Ellenőrizzük, hogy mindhárom mező kitöltött-e
    if (name && commentText) {
        const commentContainer = document.getElementById('commentsContainer');
        const articleElement = document.createElement('article');
        articleElement.classList.add('row', 'mb-3');

        // Képek
        const imageColumn = document.createElement('div');
        const textColumn = document.createElement('div');

        // Kép oszlop formázása
        imageColumn.classList.add('col-md-2', 'col-sm-4', 'col-12', 'p-2', 'img-holder');
        const selectedProfile = document.querySelector('.carousel-item.active img');
        const imageElement = document.createElement('img');
        imageElement.src = selectedProfile.src;

        // Szöveg oszlop formázása
        textColumn.classList.add('col-md-10', 'col-sm-8', 'col-12', 'd-flex', 'flex-column');

        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = `" ${commentText} "`;

        const h4Element = document.createElement('h4');
        h4Element.classList.add('mt-auto');
        h4Element.innerHTML = `<strong>${name}</strong> ${TodayDate()}`; // dátum beállítása

        // Számjegyek
        if (commentContainer.children.length % 2 != 0) {
            imageColumn.classList.add('ms-auto', 'order-2');
            textColumn.classList.add('order-1');
        } else {
            imageColumn.classList.add('me-auto');
            h4Element.classList.add('text-end');
        }

        imageColumn.appendChild(imageElement);
        articleElement.appendChild(imageColumn);

        // Szöveg és dátum hozzáadása
        textColumn.appendChild(paragraphElement);
        textColumn.appendChild(h4Element);
        articleElement.appendChild(textColumn);

        // Komment elem hozzáadása a konténerhez
        commentContainer.appendChild(articleElement);

        // Űrlap mezők ürítése
        nameInput.value = '';
        commentInput.value = '';
    } else {
        alert('Kérjük, töltse ki az összes mezőt!');
    }
    event.preventDefault();
}

function TodayDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // Számjegyek
    if (month < 10) {
        month = '0' + month;
    } if (day < 10) {
        day = '0' + day;}

    return year + '/' + month + '/' + day;
}

function chooseCard(i) {
    document.querySelector(".cardSelected").classList.remove("cardSelected")
    document.querySelector(".card-"+i).classList.add("cardSelected")
}

function submitPurchase() {
    var inputs = document.querySelectorAll(".checkout-info input");
    var i = 0;
    while (i < inputs.length && inputs[i].validity.valid == true) {
      i++;
    }
    if (i == inputs.length) {
      var cart = localStorage.getItem("HANGOSKONYV_CART");
      if (cart != "[]") {
        document.querySelector(".confirmedPurchase").style.display = "block"
        localStorage.setItem("HANGOSKONYV_CART", []);
        updatePage();
      } else {
        var toastContainer = document.getElementById('checkoutFail');
        var toast = bootstrap.Toast.getOrCreateInstance(toastContainer);
        toast.show()
      }
    }
  }