'use strict';

(function () {
  let numberField;
  let nameField;
  let lengthField;
  let weighKgField;
  let breedField;
  let resultarea;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    resultarea = document.getElementById('resultarea');
    numberField = document.getElementById('id');
    nameField = document.getElementById('name');
    lengthField = document.getElementById('length');
    weighKgField = document.getElementById('weightKg');
    breedField = document.getElementById('breed');

    document.getElementById('submit').addEventListener('click', send);

    numberField.addEventListener('focus', clear);
  }

  function clear() {
    numberField.value = '';
    nameField.value = '';
    lengthField.value = '';
    weighKgField.value = '';
    breedField.value = '';
    resultarea.textContent = '';
    resultarea.removeAttribute('class');
  }

  async function send() {
    const person = {
      id: +numberField.value,
      name: nameField.value,
      length: lengthField.value,
      weightKg: weighKgField.value,
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
