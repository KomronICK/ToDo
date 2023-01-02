// находите элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');
const emptyList = document.querySelector('#emptyList')

let tasks = [];

if (localStorage.getItem('tasks')) {
  tasks=JSON.parse(localStorage.getItem('tasks'))
  tasks.forEach( (task)=>renderTask(task))
}


  


checkEmptyList()


  //Добовления задачи
form.addEventListener('submit',addTask);

  
    //Удаления задачи
   tasksList.addEventListener('click', deleteTask)

   //Отмечаем задачу заверщенной
   tasksList.addEventListener('click', doneTask)

    //Функции
function addTask (event){
  //Отменяем отправку формы
 event.preventDefault();

 //Достать текст задачи из поля ввода 
 const taskText = taskInput.value;

 //Описывает задачу в виде обьекта
 const newTask= {
 id: Date.now(),
 text: taskText,
 done:false,
 
 };

 //Добовляем разметку для новой задачи
 tasks.push(newTask)
 
 // Cохраняем список задач в хранилище браузера localStorage
 saveToLocalStorage();

 //рендерем задачу на странице
  renderTask(newTask);
  
  
  // Очищаем поле ввода и возвращаем на него фокус
  taskInput.value = ""
  taskInput.focus ()

  checkEmptyList()
}


function deleteTask (event) {

   //Проверяем что клык был НЕ по кнопке "удалить задачу"
   if (event.target.dataset.action !=='delete')return;
   //Проверяем что клык был по кнопке "удалить задачу" 
    const parentNode = event.target.closest('.list-group-item');
    //Определяем ID задачи
    const id = Number(parentNode.id)

    //Удаляем задачу через фильтрацию массива
    tasks = tasks.filter((task) => task.id !==id);   

      // Cохраняем список задач в хранилище браузера localStorage
      saveToLocalStorage();

     //Удаляем задачу из разметки
   parentNode.remove();

   checkEmptyList()
  
}


function doneTask (event) {
 //Проверяем что клик был НЕ по кнопке "задача выполнена"
 if (event.target.dataset.action !== 'done') return
 //Проверяем что клик был по кнопке "задача выполнена"
   const parentNode = event.target.closest('.list-group-item');

   //Определяем ID задачи
   const id = Number(parentNode.id);

   const task = tasks.find((task)=>task.id===id)

   task.done =!task.done

   // Cохраняем список задач в хранилище браузера localStorage
   saveToLocalStorage();

   const taskTitle = parentNode.querySelector('.task-title')
   taskTitle.classList.toggle('task-title--done');
}

function checkEmptyList() {
  if (tasks.length === 0) {
     const emptyListHTML =`<li   id="emptyList" class="list-group-item empty-list">
     <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
     <div class="empty-list__title">Номгуи корхо холи</div>
     </li>`;
   tasksList.insertAdjacentHTML('afterbegin',  emptyListHTML);
  }  

  if (tasks.length>0) {
     const emptyListEl = document.querySelector('#emptyList')
     emptyListEl? emptyListEl.remove() : null
  }
}

function saveToLocalStorage() {
  localStorage.setItem('tasks',JSON.stringify(tasks))
}

function renderTask(task ) {
  // Формируем CSS класс
  const cssClass = task.done? 'task-title  task-title--done ' : 'task-title'

 //Формируем разметку для новой задачи
 const taskHTML = ` 
     <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
      <span class="${cssClass}">${task.text}</span>
        <div class="task-item__buttons">
      <button type="button" data-action="done" class="btn-action">
        <img src="./img/tick.svg" alt="Done" width="18" height="18">
     </button>
    <button type="button" data-action="delete" class="btn-action">
     <img src="./img/cross.svg" alt="Done" width="18" height="18">
    </button>
   </div>
  </li>`;
 //добавляем задачу на страницу
 tasksList.insertAdjacentHTML('beforeend', taskHTML);
}