var $form = document.querySelector('form');
var $formView = document.querySelector('.form-view');

$form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();
  var formField = {};
  formField.sol = parseInt($form.elements.sol.value);
  formField.cam = $form.elements.cam.value;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=' + formField.sol + '&camera=' + formField.cam + '&api_key=keWG87uo1id4PeCBBKSzf0UuYTSSOzjV04iMYZuH');
  xhr.responseType = 'json';
  xhr.addEventListener('load', apiReturner);
  xhr.send();
}

function apiReturner(event) {
  // console.log(event.target.response);
  $formView.className = 'form-view hidden';
  // if (event.target.response.photos.length === 0) {}
}

/*
 var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  console.log(xhr.status);
  console.log(xhr.response);
  var users = xhr.response;

});
xhr.send();
*/
