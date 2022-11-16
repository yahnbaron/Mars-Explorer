/* exported data */
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('mars-explorer');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
window.addEventListener('beforeunload', save);

function save(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('mars-explorer', dataJSON);
}
