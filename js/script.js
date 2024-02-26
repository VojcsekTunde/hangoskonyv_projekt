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

var SearchBar = document.getElementById("SearchBar");

var audiosTitle=["Fantasy-1","Fantasy-2","Fantasy-3","Fantasy-4","Gyerek-1","Gyerek-2","Gyerek-3","Gyerek-4","Ifjúsági-1","Ifjúsági-2","Ifjúsági-3","Ifjúsági-4","Szépirodalmi-1","Szépirodalmi-2","Szépirodalmi-3","Szépirodalmi-4","Ismeretterjesztő-1","Ismeretterjesztő-2","Ismeretterjesztő-3","Ismeretterjesztő-4"];
