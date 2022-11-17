var $form = document.querySelector('form');
var $formView = document.querySelector('.form-view');
var $errorMessage = document.querySelector('.error-message');
var $previewImg = document.querySelector('.preview-img');
var $preView = document.querySelector('.preview');
var $solSpan = document.querySelector('.display-sol');
var $earthSpan = document.querySelector('.display-earth');
var badDay;
var $backButton = document.querySelector('.back-button');
var $addButton = document.querySelector('.add-button');
var photoData = {};
var $collectionView = document.querySelector('.collection-view');
var $logoA = document.querySelector('.logo-a');

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
  $form.reset();
}

function apiReturner(event) {
  $formView.classList.add('hidden');
  $preView.classList.remove('hidden');
  if (event.target.response.photos.length === 0) {
    $errorMessage.classList.remove('hidden');
    $solSpan.textContent = badDay;
    $earthSpan.textContent = 'unknown';
    $previewImg.setAttribute('src', 'images/sadRover.png');
  } else {
    $previewImg.setAttribute('src', event.target.response.photos[0].img_src);
    photoData.src = event.target.response.photos[0].img_src;
    photoData.sol = event.target.response.photos[0].sol;
    photoData.earthDate = event.target.response.photos[0].earth_date;
    $solSpan.textContent = event.target.response.photos[0].sol;
    $earthSpan.textContent = event.target.response.photos[0].earth_date;
  }
}

$backButton.addEventListener('click', goBack);

function goBack(event) {
  $errorMessage.classList.add('hidden');
  $formView.classList.remove('hidden');
  $preView.classList.add('hidden');
}

$addButton.addEventListener('click', addIt);

function addIt(event) {
  if ($previewImg.getAttribute('src') === 'images/sadRover.png') {
    return;
  }
  photoData.entryId = data.nextEntryId++;
  data.entries.unshift(photoData);
  $preView.classList.add('hidden');
  $collectionView.classList.remove('hidden');
}

$logoA.addEventListener('click', switchToCollection);

function switchToCollection(event) {
  $preView.classList.add('hidden');
  $formView.classList.toggle('hidden');
  $collectionView.toggle('hidden');
}
