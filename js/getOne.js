'use strict';

(function () {
  let resultarea;
  let inputField;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    resultarea = document.getElementById('resultarea');
    inputField = document.getElementById('get1id');

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
            const data = await fetch(`/all`);
            const result = await data.json();
      
            const resultset = document.getElementById('resultset');
      
              const tr = document.createElement('tr');
              tr.appendChild(createCell(dog.id));
              tr.appendChild(createCell(dog.name));
              tr.appendChild(createCell(dog.length));
              tr.appendChild(createCell(dog.weightKg));
              tr.appendChild(createCell(dog.breed));
              resultset.appendChild(tr);
            }
          } catch (err) {
            console.log(err);
          }
        } //end of init
      
        function createCell(data) {
          const td = document.createElement('td');
          td.textContent = data;
          return td;
        }
      })();