'use strict';

(function () {
  let idField;
  let nameField;
  let lengthField;
  let weighKgField;
  let breedField;
  let resultarea;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    resultarea = document.getElementById('resultarea');
    idField = document.getElementById('id');
    nameField = document.getElementById('name');
    lengthField = document.getElementById('length');
    weighKgField = document.getElementById('weightKg');
    breedField = document.getElementById('breed');

    document.getElementById('submit').addEventListener('click', send);

    idField.addEventListener('focus', clear);
  }

  function clear() {
    idField.value = '';
    nameField.value = '';
    lengthField.value = '';
    weighKgField.value = '';
    breedField.value = '';
    resultarea.textContent = '';
    resultarea.removeAttribute('class');
  }

  async function send() {
    const person = {
      id: +idField.value,
      name: nameField.value,
      length: lengthField.value,
      weighKg: weighKgField.value,
      breed: breedField.value,
    };

    try {
      const options = {
        method: 'POST',
        body: JSON.stringify(person),
        headers: {'Content-Type': 'application/json'},
      };
      const data = await fetch('/addPerson', options);
      const result = await data.json();

      updateStatus(result);
    } catch (err) {
      updateStatus({message: err.message, type: 'error'});
    }
  } //end of send

  function updateStatus(status) {
    resultarea.textContent = status.message;
    resultarea.setAttribute('class', status.type);
  }
})();
