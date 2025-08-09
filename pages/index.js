import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

/* ---------- DOM elements ---------- */
const addTodoBtn = document.querySelector(".button_action_add");
const todosContainerSelector = ".todos__list";
const counterSelector = ".counter__text";

/* ---------- Counter instance ---------- */
const todoCounter = new TodoCounter(initialTodos, counterSelector);

/* ---------- Single helper: create & mount a todo ---------- */
const renderTodo = (todoData) => {
  const todo = new Todo(todoData, "#todo-template", todoCounter);
  section.addItem(todo.getView());
};

/* ---------- Section instance (initial render) ---------- */
const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: todosContainerSelector,
});
section.renderItems();

/* ---------- Form validator ---------- */
const formValidator = new FormValidator(
  validationConfig,
  addTodoPopup.getForm()
);
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

    renderTodo(newTodoData);         
    formValidator.resetValidation();
  },
});
addTodoPopup.setEventListeners();

/* ---------- Open popup button ---------- */
addTodoBtn.addEventListener("click", () => {
  addTodoPopup.open();
});
