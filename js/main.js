var $form = document.querySelector('form');
var $formView = document.querySelector('.form-view');
var $errorMessage = document.querySelector('.error-message');
var $previewImg = document.querySelector('.preview-img');
var $preView = document.querySelector('.preview');
var $solSpan = document.querySelector('.display-sol');
var $earthSpan = document.querySelector('.display-earth');
var badDay;

$form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();
  var formField = {};
  formField.sol = parseInt($form.elements.sol.value);
  badDay = formField.sol;
  formField.cam = $form.elements.cam.value;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=' + formField.sol + '&camera=' + formField.cam + '&api_key=keWG87uo1id4PeCBBKSzf0UuYTSSOzjV04iMYZuH');
  xhr.responseType = 'json';
  xhr.addEventListener('load', apiReturner);
  xhr.send();
}

function apiReturner(event) {
  $formView.classList.add('hidden');
  $preView.classList.remove('hidden');
  if (event.target.response.photos.length === 0) {
    $errorMessage.classList.remove('hidden');
    $solSpan.textContent = badDay;
    $earthSpan.textContent = 'unknown';
  } else {
    $previewImg.setAttribute('src', event.target.response.photos[0].img_src);
    $solSpan.textContent = event.target.response.photos[0].sol;
    $earthSpan.textContent = event.target.response.photos[0].earth_date;
  }
}
