import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = [...this._form.querySelectorAll(".popup__input")];
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => (values[input.name] = input.value));
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._form.reset(); 
      this.close();
    });
  }

  getForm() {
    return this._form;
  }
}
