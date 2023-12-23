'use strict';

(function () {
  let keylist;
  let resultarea;
  let searchvalue;

  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    keylist = document.getElementById('keylist');
    resultarea = document.getElementById('resultarea');
    searchvalue = document.getElementById('searchvalue');

    try {
      const data = await fetch('/keys');
      if (data.ok) {
        const keys = await data.json();
        if (keys.length > 0) {
          populateList(keys);
        } else {
          showErrorMessage('search not available');
        }
      } else {
        showErrorMessage('failed communication!');
      }
    } catch (err) {
      showErrorMessage(err.message);
    }
  } //end of init

  function populateList(keynames) {
    for (const field of keynames) {
      const option = document.createElement('option');
      option.value = field;
      option.textContent = field;

      keylist.appendChild(option);
    }

    keylist.value = keynames[0];

    document.getElementById('submit').addEventListener('click', send);
  } //end of populateList

  async function send() {
    const keyName = keylist.value;
    const value = searchvalue.value;

    try {
      const fetchOptions = {
        method: 'POST',
        body: JSON.stringify({value, key: keyName}),
        headers: {'Content-Type': 'application/json'},
      };
      const data = await fetch('/search', fetchOptions);
      const result = await data.json();

      updatePage(result);
    } catch (err) {
      showErrorMessage(err.message);
    }
  }

  function updatePage(data) {
    if (!data) {
      showErrorMessage('Programming error!');
    } else if (data.length === 0) {
      showErrorMessage('Nothing found');
    } else {
      const htmlString = data.map((item) => createPerson(item)).join(' ');
      resultarea.innerHTML = htmlString;
    }
  }

  function createPerson(dog) {
    return `<div class="person">
        <p>Number: ${dog.id}</p>
        <p>First name: ${dog.name}</p>
        <p>Last name: ${dog.length}</p>
        <p>Department: ${dog.weightKg}</p>
        <p>Salary: ${dog.breed}</p>
    </div>`;
  }

  function showErrorMessage(message) {
    resultarea.innerHTML = `<p>${message}</p>`;
  }
})();
