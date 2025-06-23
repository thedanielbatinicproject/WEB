document.addEventListener('DOMContentLoaded', function() {
    const categories = [
        { id: "work", label: "Work" },
        { id: "mab", label: "Movies and books" },
        { id: "fun", label: "Fun" },
        { id: "sports", label: "Sports" }
    ];
    let allTodos = [];
    let myTodos = [];

    fetch('/todos')
      .then(res => res.json())
      .then(data => {
        allTodos = data.allTodos;
        myTodos = data.myTodos;
        renderTodos();
        renderFooter();
      })
      .catch(err => {console.log("ERROR OCURRED " + err);});

    function renderTodos() {
        categories.forEach(cat => {
            const wrapper = document.getElementById(cat.id);
            if (!wrapper) return;
            const list = wrapper.querySelector('.todo-list');
            const header = wrapper.querySelector('.todo-header .count');
            const todos = allTodos.filter(t => t.category === cat.id);
            header.textContent = `(${todos.length})`;
            list.innerHTML = '';
            todos.forEach((element, idx) => {
                const row = document.createElement("div");
                row.className = "todo-row";
                // Prikaži X samo za svoje todo-e
                const isMine = myTodos.find(t => t.id === element.id);
                row.innerHTML = `
                    <span class="todo-index">${idx + 1}.</span>
                    <span class="todo-content">${element.cont}</span>
                    <span class="todo-date">${element.date || ''}</span>
                    ${isMine ? `<button class="todo-remove" data-id="${element.id}">X</button>` : ""}
                `;
                list.appendChild(row);
            });
        });

        // Dodaj event listenere na X gumbe
        document.querySelectorAll('.todo-remove').forEach(btn => {
            btn.onclick = function() {
                const id = this.getAttribute('data-id');
                fetch(`/todos/${id}`, { method: 'DELETE' })
                  .then(res => res.json())
                  .then(() => {
                    // Ponovno učitaj todo-e
                    return fetch('/todos');
                  })
                  .then(res => res.json())
                  .then(data => {
                    allTodos = data.allTodos;
                    myTodos = data.myTodos;
                    renderTodos();
                    renderFooter();
                  });
            };
        });
    }

    function renderFooter() {
        document.getElementById('my-count').textContent = myTodos.length;
        document.getElementById('all-count').textContent = allTodos.length;
    }
});