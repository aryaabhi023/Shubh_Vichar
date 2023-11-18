class Model {
  constructor() {
    this._add_btn = document.querySelector(".add");
    this._model = document.getElementById("model");
    this.addEventListeners();
  }
  addEventListeners() {
    this._add_btn.addEventListener("click", this.open.bind(this));
    window.addEventListener("click", this.outsideClick.bind(this));
    document.addEventListener("closemodel", () => this.close());
  }
  open() {
    this._model.style.display = "block";
  }
  close() {
    this._model.style.display = "none";
  }
  outsideClick(e) {
    if (e.target === this._model) {
      this.close();
    }
  }
}

export default Model;
