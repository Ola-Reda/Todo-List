const searchInput = document.querySelector('.search')
const taskInput = document.querySelector('.task')
const addBtn = document.querySelector('.add-btn');
const saveBtn = document.querySelector('.save-btn');
const deleteBtn = document.querySelector('.delete-btn');
const table = document.querySelector('.table')


let tasksArray = JSON.parse(localStorage.getItem('tasks')) || []
addTasksToPage(tasksArray)

//addtask
addBtn.addEventListener('click', addTasks)
function addTasks () {
    if (taskInput.value !== "") {
        addTasksToArray(taskInput.value);
        taskInput.value = "";
    }
}

function addTasksToArray(taskText) {
    const task = {
        id: Date.now(),
        name: taskText,
        complete: false
    }
    tasksArray.push(task)
    addTasksToPage(tasksArray)
}

function addTasksToPage(tasks) {
    table.innerHTML = ""
    let data = ''
    tasks.map((task, index)=> {
        data += `
            <tr>
                <td>${index+1}</td>
                <td>${task.name}</td>
                <td>
                    <button class="btn edit-btn" onclick="editTask(${index})">
                        <i class="fa-regular fa-pen-to-square"></i>
                        Edit
                    </button>
                </td>
                <td>
                    <button class="btn complete-btn" id=${task.id}  >
                        <i class="fa-regular fa-square-check"></i>
                        Complete
                    </button>
                </td>
                <td>
                    <button class="btn delete-btn" onclick="deleteTask(${task.id})">
                        <i class="fa-regular fa-trash-can"></i>
                        Delete
                    </button>
                </td>
            </tr>`
    })
    table.innerHTML = data
    addToStorage(tasks)
}

//add to localstorage
function addToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//edit function 
function editTask(index) {
    taskInput.focus()
    let saveTask = document.querySelector('.hidden-task')
    saveTask.value = index
    let task = JSON.parse(localStorage.getItem('tasks'))[index].name
    taskInput.value = task
    addBtn.style.display = "none"
    saveBtn.style.display = "block"
}

//save task after edit
saveBtn.addEventListener('click', saveTask)
function saveTask() {
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    saveTask = document.querySelector('.hidden-task').value
    for(let keys in tasks[saveTask]){
        if(keys == 'name'){
            tasks[saveTask].name = taskInput.value;
        }
    }
    addToStorage(tasks)
    addBtn.style.display = "block"
    saveBtn.style.display = "none"
    addTasksToPage(tasks)
    taskInput.value = "";
}



//complete function 
table.addEventListener('click', function(e) {
    if(e.target.classList.contains('complete-btn')) {
        e.target.parentElement.previousElementSibling.previousElementSibling.classList.toggle('complete')
    }
    toggleStatus (e.target.getAttribute("id"))
})
function toggleStatus(id) {
    for (let i=0 ; i< tasksArray.length; i++){
        if (tasksArray[i].id == id) {
            tasksArray[i].complete == false ? tasksArray[i].complete = true : tasksArray[i].complete = false
        }
    }
    addToStorage(tasksArray)
}


//delete function 
function deleteTask(taskId) {
    tasksArray = tasksArray.filter(item => item.id !== taskId)
    addToStorage(tasksArray)
    addTasksToPage(tasksArray)
}


//delete all
deleteBtn.addEventListener('click', deleteAllTasks)
function deleteAllTasks() {
localStorage.clear()
tasksArray = []
addTasksToPage(tasksArray)
}

//search
searchInput.addEventListener("input", search)
function search() {
    let value = searchInput.value
    let tasks = tasksArray.filter(task => task.name.includes(value))
    addTasksToPage(tasks)
}