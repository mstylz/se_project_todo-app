class Todo {
  constructor(data, selector, counter) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._counter = counter;   // <-- receive counter
  }

  _setEventListeners() {
    // delete
    this._deleteBtn.addEventListener("click", () => {
      const wasCompleted = this._checkbox.checked;
      this._element.remove();
      this._counter.updateTotal(false);
      if (wasCompleted) this._counter.updateCompleted(false);
    });

    // checkbox
    this._checkbox.addEventListener("change", (evt) => {
      this._data.completed = evt.target.checked;
      this._counter.updateCompleted(evt.target.checked);
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
