import ideasApi from "../server/ideasApi";
import IdeaList from "./ideaList";
class Form {
  constructor() {
    this._form = document.getElementById("idea-form");
    this._IdeaList = new IdeaList();
    this.addEventListeners();
  }
  addEventListeners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
  }
  async handleSubmit(e) {
    e.preventDefault();
    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };

    if (idea.text === "" || idea.tag === "" || idea.username === "") {
      alert("Please fill all the field.");
      return;
    }

    //Adding new ideas
    try {
      const newIdea = await ideasApi.createIdea(idea);
      this._IdeaList.addIdea(newIdea.data);
    } catch (err) {
      console.log(err);
    }

    this._form.elements.text.value = "";
    this._form.elements.tag.value = "";
    this._form.elements.username.value = "";
    document.dispatchEvent(new Event("closemodel"));
  }
}

export default Form;
