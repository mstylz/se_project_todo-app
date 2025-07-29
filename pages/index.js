import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

/* ===== DOM elements ===== */
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

/* ===== reusable helpers ===== */
const handleEscapeKey = (evt) => {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_visible");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
};

const openModal = (modal) => {
  modal.classList.add("popup_visible");
  document.addEventListener("keydown", handleEscapeKey);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleEscapeKey);
};

const renderTodo = (todoData) => {
  todosList.append(generateTodo(todoData));
};

/* ===== form validator ===== */
const todoValidator = new FormValidator(validationConfig, addTodoForm);
todoValidator.enableValidation();

/* ===== todo generator ===== */
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

/* ===== event listeners ===== */
addTodoButton.addEventListener("click", () => openModal(addTodoPopup));
addTodoCloseBtn.addEventListener("click", () => closeModal(addTodoPopup));

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const todoName = evt.target.name.value;
  const dateInput = evt.target.date.value;

  let date = null;
  if (dateInput) {
    date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  }

  const id = uuidv4();
  const newTodoData = {
    name: todoName,
    date,
    id,
    completed: false,
  };

  renderTodo(newTodoData);

  evt.target.reset();
  todoValidator.resetValidation();
  closeModal(addTodoPopup);
});

/* ===== initial render ===== */
initialTodos.forEach(renderTodo);
