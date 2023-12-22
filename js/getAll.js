'use strict';

(function () {
  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    try {
      const data = await fetch('/all');
      const result = await data.json();

      const resultset = document.getElementById('resultset');

      for (const dog of result) {
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
