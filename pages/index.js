import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

/* ---------- DOM elements ---------- */
const addTodoBtn = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const todosContainerSelector = ".todos__list";
const counterSelector = ".counter__text";

/* ---------- Counter instance ---------- */
const todoCounter = new TodoCounter(initialTodos, counterSelector);

/* ---------- Section instance ---------- */
const section = new Section({
  items: initialTodos,
  renderer: (todoData) => {
    const todo = new Todo(todoData, "#todo-template");
    const todoElement = todo.getView();
    section.addItem(todoElement);

    todoElement
      .querySelector(".todo__completed")
      .addEventListener("change", (evt) =>
        todoCounter.updateCompleted(evt.target.checked)
      );

    todoElement
      .querySelector(".todo__delete-btn")
      .addEventListener("click", () => {
        todoElement.remove();
        todoCounter.updateTotal(false);
        if (todoData.completed) todoCounter.updateCompleted(false);
      });
  },
  containerSelector: todosContainerSelector,
});

section.renderItems();

/* ---------- Form validator ---------- */
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

/* ---------- Popup instance ---------- */
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: ({ name, date }) => {
    let parsedDate = null;
    if (date) {
      parsedDate = new Date(date);
      parsedDate.setMinutes(
        parsedDate.getMinutes() + parsedDate.getTimezoneOffset()
      );
    }

    const newTodoData = {
      id: uuidv4(),
      name,
      date: parsedDate,
      completed: false,
    };

    const todo = new Todo(newTodoData, "#todo-template");
    const todoElement = todo.getView();
    section.addItem(todoElement);
    todoCounter.updateTotal(true);

    todoElement
      .querySelector(".todo__completed")
      .addEventListener("change", (evt) =>
        todoCounter.updateCompleted(evt.target.checked)
      );

    todoElement
      .querySelector(".todo__delete-btn")
      .addEventListener("click", () => {
        todoElement.remove();
        todoCounter.updateTotal(false);
      });
  },
});

addTodoPopup.setEventListeners();

/* ---------- Open popup button ---------- */
addTodoBtn.addEventListener("click", () => {
  addTodoPopup.open();
  formValidator.resetValidation();
});
