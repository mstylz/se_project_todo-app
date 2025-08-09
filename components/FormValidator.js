class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._form = formElement;
    this._inputs = [...formElement.querySelectorAll(settings.inputSelector)];
    this._submitBtn = formElement.querySelector(settings.submitButtonSelector);
  }

  _showError(input, msg) {
    const errorEl = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._settings.inputErrorClass);
    errorEl.textContent = msg;
    errorEl.classList.add(this._settings.errorClass);
  }

  _hideError(input) {
    const errorEl = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._settings.inputErrorClass);
    errorEl.textContent = "";
    errorEl.classList.remove(this._settings.errorClass);
  }

  _checkInputValidity(input) {
    input.validity.valid
      ? this._hideError(input)
      : this._showError(input, input.validationMessage);
  }

  _toggleButtonState() {
    const invalid = this._inputs.some((i) => !i.validity.valid);
    this._submitBtn.disabled = invalid;
    this._submitBtn.classList.toggle(
      this._settings.inactiveButtonClass,
      invalid
    );
  }

  _setEventListeners() {
    this._inputs.forEach((input) =>
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      })
    );
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }

  resetValidation() {
    // this._form.reset();   ← removed—form keeps user input
    this._inputs.forEach((i) => this._hideError(i));
    this._toggleButtonState();
  }
}

export default FormValidator;
