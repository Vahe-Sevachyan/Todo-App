const inputValue = document.querySelector(".todoInput");
const todoList = document.querySelector(".todoList");
const addTaskBtn = document.querySelector(".addButton");
const checkbox = document.getElementById("checkbox");
///filter items selectors
const allItemsBtn = document.querySelector(".allItems");
const activeBtn = document.querySelector(".activeItems");
const completedBtn = document.querySelector(".completedItems");
const clearCompletedBtn = document.querySelector(".clearCompleted");
let itemsLeft = document.querySelector(".itemsLeft");
const borderBottom = document.querySelector(".todos");

todoList.addEventListener("click", deleteTask);

let listItems = 0;

// step #1 checks if enter key has been pressed
inputValue.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    validateInput();
  }
});
//step #2 checks if add button has been clicked
addTaskBtn.addEventListener("click", () => {
  validateInput();
});
// step#3 invokes function to check for empty string
const validateInput = () => {
  if (inputValue.value === "") {
    alert("Please enter a value");
    return;
  }
  //step#4 invokes function to render task
  renderTask(inputValue.value);
};
//updates total tasks display amount
function itemsValue() {
  if (listItems === 1) {
    itemsLeft.innerText = `${listItems} item left`;
  } else if (listItems > 1 || listItems === 0) {
    itemsLeft.innerText = `${listItems} items left`;
  }
}
// adds task with click
function renderTask() {
  //   e.preventDefault();
  //creates task item
  const todos = document.createElement("li");
  todos.classList.add("todos");
  //creates checkbox
  const checkBox = document.createElement("input");
  checkBox.classList.add("checkbox-list");
  checkBox.setAttribute("type", "checkbox");
  //creates list item
  const listItem = document.createElement("li");
  listItem.classList.add("listItem");
  listItem.innerHTML = inputValue.value;
  //creates X icon to delete item
  const xIcon = document.createElement("img");
  xIcon.classList.add("xClose");
  // xIcon.setAttribute("src", "../images/icon-cross.svg");
  //EDIT BUTTON
  const EditBtnsWrapper = document.createElement("span");
  EditBtnsWrapper.classList.add("EditBtnsWrapper");
  //EDIT BUTTON
  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fas fa-paperclip"></i> ';
  editButton.classList.add("edit-btn");
  editButton.addEventListener("click", () => {
    listItem.setAttribute("contentEditable", true);
    listItem.focus();
  });
  //appends items to list
  EditBtnsWrapper.append(editButton, xIcon);
  todos.append(checkBox, listItem, EditBtnsWrapper);
  // todoList.appendChild(todos);
  todoList.insertBefore(todos, todoList.firstChild);

  inputValue.value = null;
  inputValue.focus();
  listItems++;
  itemsValue();
}
//adds selected class to active list
const removeSelected = () => {
  allItemsBtn.classList.remove("selected");
  activeBtn.classList.remove("selected");
  completedBtn.classList.remove("selected");
};
//deletes tasks
function deleteTask(x) {
  const item = x.target;
  const todo = item.parentElement.parentElement;
  //removes todo item
  if (item.classList[0] === "xClose") {
    todo.remove();
    listItems--;
    itemsValue();
  }
  //marks todo as completed
  if (item.classList[0] === "checkbox-list") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
//show only completed tasks
completedBtn.onclick = () => {
  removeSelected();
  completedBtn.classList.add("selected");
  const allTodos = todoList.childNodes;
  allTodos.forEach((todo) => {
    if (todo.classList.contains("completed")) {
      todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
  });
};
//show only active tasks
activeBtn.onclick = () => {
  removeSelected();
  activeBtn.classList.add("selected");
  const allTodos = todoList.childNodes;
  allTodos.forEach((todo) => {
    if (!todo.classList.contains("completed")) {
      todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
  });
};
//show all tasks
allItemsBtn.onclick = () => {
  removeSelected();
  allItemsBtn.classList.add("selected");
  const allTodos = todoList.childNodes;
  allTodos.forEach((todo) => {
    if (todo.classList.contains("todos")) {
      todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
  });
};
//Clear completed Tasks
clearCompletedBtn.onclick = () => {
  const completedTasks = document.querySelectorAll(".completed");
  completedTasks.forEach((task) => task.remove());
  listItemsDeleted = completedTasks.length;
  listItems -= listItemsDeleted;
  itemsValue();
};
//drag and drop
const dragArea = document.querySelector("#todoList");
new Sortable(dragArea, {
  animation: 350,
});

//light/dark mode toggles
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("light");
  document.body.classList.toggle("lightBodyColor");
  document.body.classList.toggle("lightInputColor");
  document.body.classList.toggle("lightTodos");
  document.body.classList.toggle("lightBottomSection");
  document.body.classList.toggle("lightBottomSectionHover");
  document.body.classList.toggle("toggleSwitch");
  document.body.classList.toggle("toggleBallColor");
  document.body.classList.toggle("checkBoxColorToggle");
  document.body.classList.toggle("editButtonPaperClip");
});
