'use strict';

(function () {
  let resultarea;
  let inputField;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    resultarea = document.getElementById('resultarea');
    inputField = document.getElementById('rmid');

    document.getElementById('submit').addEventListener('click', send);
    inputField.addEventListener('focus', clear);
  }

  function clear() {
    inputField.value = '';
    resultarea.textContent = '';
    resultarea.removeAttribute('class');
  }

  function updateStatus(status) {
    resultarea.textContent = status.message;
    resultarea.setAttribute('class', status.type);
  }

  async function send() {
    const value = inputField.value;
    if (value <= 0) {
      updateStatus({message: 'Invalid id', type: 'error'});
    } else {
      try {
        const options = {
          method: 'POST',
          body: JSON.stringify({value}),
          headers: {'Content-Type': 'application/json'},
        };

        const data = await fetch('/remove', options);
        const result = await data.json();
        updateStatus(result);
      } catch (err) {
        updateStatus({message: err.message, type: 'error'});
      }
    }
  }
})();
