const caixaescreve = document.getElementById("caixa-escreve");
const boxlista = document.getElementById("box-lista");
const deletedTasksList = document.getElementById("deletedTasksList");
const emptyMessage = document.getElementById("emptyMessage");

function addTask() {
    if (caixaescreve.value === '') {
        alert("Você deve escrever algo primeiro");
    } else {
        let li = document.createElement("li");
        li.innerHTML = caixaescreve.value;
        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        boxlista.appendChild(li);
    }
    caixaescreve.value = "";
    saveTasks();
}

boxlista.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("verificado");
        saveTasks();
    } else if (e.target.tagName === "SPAN") {
        const taskText = e.target.parentElement.textContent.replace('\u00d7', '').trim();
        const taskChecked = e.target.parentElement.classList.contains("verificado");
        const currentDate = new Date();
        const dateTime = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
        
        const deletedTask = document.createElement("li");
        if (taskChecked) {
            deletedTask.classList.add("checked"); 
        }
        deletedTask.innerHTML = `${taskText} <small>(${dateTime})</small> <button class="delete-btn">x</button>`;
        deletedTasksList.appendChild(deletedTask);

        e.target.parentElement.remove();
        updateEmptyMessage();
        saveTasks();
    }
}, false);

deletedTasksList.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        const taskText = e.target.innerHTML.split(' <small>')[0]; // Pega o texto da tarefa sem a data
        const taskChecked = e.target.classList.contains("checked");
        
        const restoredTask = document.createElement("li");
        restoredTask.innerHTML = taskText;
        if (taskChecked) {
            restoredTask.classList.add("verificado"); // Marca a tarefa como "checked"
        }
        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        restoredTask.appendChild(span);
        
        boxlista.appendChild(restoredTask);
        updateEmptyMessage();
        e.target.remove();
        saveTasks();

        }else if (e.target.classList.contains("delete-btn")){
        e.target.parentElement.remove();
        updateEmptyMessage();
        saveTasks();
    }
}, false);

function saveTasks() {
    localStorage.setItem("tasks", boxlista.innerHTML);
    localStorage.setItem("deletedTasks", deletedTasksList.innerHTML);
}

function loadTasks() {
    boxlista.innerHTML = localStorage.getItem("tasks") || '';
    deletedTasksList.innerHTML = localStorage.getItem("deletedTasks") || '';
    updateEmptyMessage(); 
}

function updateEmptyMessage() {
    if (deletedTasksList.children.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }
}

function toggleMenu() {
    const menuLateral = document.getElementById('menuLateral');
    menuLateral.classList.toggle('show');
}

loadTasks();