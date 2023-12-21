const form = document.querySelector(".add");
const input = document.querySelector(".input");
const addBtn = document.querySelector(".add_btn");
const deleteBtns = document.querySelector(".delete_btns");
const deleteDoneBtn = document.querySelector(".delete_done");
const deleteAllBtn = document.querySelector(".delete_all");
const ul = document.querySelector(".list");

let toDoList = [];

if (localStorage.getItem("toDoList")) {
  toDoList = JSON.parse(localStorage.getItem("toDoList"));
  toDoList.forEach((task) => renderTask(task));
}

// прослушка удаления всех задач
deleteBtns.addEventListener("click", deleteAll);

// прослушка добавления одной задачи
form.addEventListener("submit", addTask);

// прослушка удаления одной конкретной задачи
ul.addEventListener("click", deleteCrossTask);

// прослушка зачеркивания выполненной задачи
ul.addEventListener("click", crossDoneTask);

// ФУНКЦИЯ ДОБАВЛЕНИЯ ЗАДАЧИ =======================
function addTask(e, task) {
  e.preventDefault();

  if (input.value.length === 0) {
    return;
  }

  const taskObj = {
    isDone: false,
    id: toDoList.length,
    text: input.value,
  };

  // добавляем задачу в массив с задачами
  toDoList.push(taskObj);

  renderTask(taskObj);

  input.value = "";
  input.focus();

  // save
  saveToLocalStorage();
}

// ФУНКЦИЯ УДАЛЕНИЯ ВСЕХ ЗАДАЧ =======================
function deleteAll(ev) {
  if (ev.target.closest(".delete_all")) {
    ul.innerHTML = "";
    toDoList = [];
    saveToLocalStorage();
  }
}

// ФУНКЦИЯ УДАЛЕНИЯ КОНКРЕТНОЙ ЗАДАЧИ =======================
function deleteCrossTask(e) {
  if (e.target.closest(".cross")) {
    const taskNode = e.target.closest(".list_li");

    // определяем id задачи
    const id = Number(taskNode.id);

    toDoList = toDoList.filter((task) => {
      if (task.id === id) {
        // есть айди такса который перебирается равен айди нажатой задачи то удаляй его из массива
        return false;
      } else {
        return true;
      }
    });

    // save
    saveToLocalStorage();

    taskNode.remove();
  }
}

//ФУНКЦИЯ ЗАЧЕРКИВАНИЯ ЗАДАЧИ =======================
function crossDoneTask(ev) {
  if (ev.target.closest(".checkbox")) {
    const parentOfText = ev.target.closest(".list_li");

    //определяем айди задачи
    const id = Number(parentOfText.id);

    // удаляем задачу через фильтр массива, ищем
    const taskDone = toDoList.find((task) => task.id === id);

    // меняем состояние на противоположное
    taskDone.isDone = !taskDone.isDone;

    // // сохраняем

    const text = parentOfText.querySelector(".list_item");

    // прослушка удаления заверешенный задач
    deleteDoneBtn.addEventListener("click", deleteDoneTasks);
    // ФУНКЦИЯ УДАЛЕНИЯ ЗАВЕРШЕННЫХ ЗАДАЧ =======================
    function deleteDoneTasks() {
      parentOfText.remove();
      // const filtredDoneTasks = toDoList
    }

    toDoList.forEach((task) => {
      if (task.isDone === true) {
        return false;
      } else {
        return true;
      }
    });

    // сохраняем
    saveToLocalStorage();

    console.log(toDoList);
    return text.classList.toggle("crossed");
  }
}

// ФУНКЦИЯ СОХРАНЕНИЯ ДАННЫХ =================
function saveToLocalStorage() {
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

// ФУНКЦИЯ ОТРИСОВКИ ===========================
function renderTask(task) {
  const crossedClass = task.isDone ? "list_item crossed" : "list_item";

  const listLi = document.createElement("li");
  listLi.className = "list_li";

  listLi.innerHTML = `
    <input class="checkbox" type="checkbox">
    <p id="${task.id}" class="${crossedClass}">${task.text}</p>
    <img class="cross" src="../icons/cross.webp"></img>
    `;

  listLi.id = toDoList.length - 1;

  ul.prepend(listLi);
}
