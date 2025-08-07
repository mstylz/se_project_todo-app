class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _setEventListeners() {
    this._deleteBtn.addEventListener("click", () => this._element.remove());
    this._checkbox.addEventListener("change", () => {
      this._data.completed = this._checkbox.checked;
    });
  }

  getView() {
    this._element = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._checkbox = this._element.querySelector(".todo__completed");
    this._label = this._element.querySelector(".todo__label");
    this._nameEl = this._element.querySelector(".todo__name");
    this._dateEl = this._element.querySelector(".todo__date");
    this._deleteBtn = this._element.querySelector(".todo__delete-btn");

    this._nameEl.textContent = this._data.name;
    this._checkbox.checked = this._data.completed;
    this._checkbox.id = `todo-${this._data.id}`;
    this._label.setAttribute("for", this._checkbox.id);

    if (this._data.date && !isNaN(new Date(this._data.date))) {
      const due = new Date(this._data.date);
      this._dateEl.textContent = `Due: ${due.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._setEventListeners();
    return this._element;
  }
}

export default Todo;
