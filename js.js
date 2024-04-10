// js.js
const input = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

addButton.addEventListener('click', addTodo);
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const todoText = input.value.trim();
    if (todoText) {
        const li = document.createElement('li');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('todo-checkbox');
        checkbox.addEventListener('change', toggleTodo);
        
        const label = document.createElement('label');
        label.textContent = todoText;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', removeTodo);
        
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(removeButton);
        
        todoList.appendChild(li);
        input.value = '';
        
        // Update task counts
        updateTotalTaskCount();
        updateCompletedTaskCount();
    }
}

function toggleTodo() {
    const listItem = this.parentNode;
    listItem.classList.toggle('completed');
    
    // Update completed tasks count
    updateCompletedTaskCount();
    // Update total tasks count (in case the task is being marked as incomplete)
    updateTotalTaskCount();
}

function removeTodo(event) {
    event.stopPropagation(); // Prevent event from bubbling up to the li element
    const listItem = this.parentNode;
    todoList.removeChild(listItem);
    
    // Update total tasks count
    updateTotalTaskCount();
    // Update completed tasks count if the removed task was completed
    if (listItem.classList.contains('completed')) {
        updateCompletedTaskCount();
    }
}

// Function to update total task count
function updateTotalTaskCount() {
    const totalTasks = todoList.children.length;
    document.getElementById('total-task-count').textContent = totalTasks;
}

// Function to update completed task count
function updateCompletedTaskCount() {
    const completedTasks = document.querySelectorAll('#todo-list .completed').length;
    document.getElementById('completed-task-count').textContent = completedTasks;
}

// Event listener for filter dropdown
const filterDropdown = document.getElementById('filter-todos');
filterDropdown.addEventListener('change', filterTodos);

// Function to filter todos based on selected option
function filterTodos() {
    const selectedOption = filterDropdown.value;
    const todoItems = document.querySelectorAll('#todo-list li');

    todoItems.forEach(item => {
        if (selectedOption === 'all') {
            item.style.display = 'flex'; // Show all todos
        } else if (selectedOption === 'completed') {
            item.style.display = item.classList.contains('completed') ? 'flex' : 'none'; // Show only completed todos
        } else if (selectedOption === 'pending') {
            item.style.display = item.classList.contains('completed') ? 'none' : 'flex'; // Show only pending todos
        }
    });
}
