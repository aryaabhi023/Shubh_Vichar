import ideasApi from "../server/ideasApi";
class IdeaList {
  constructor() {
    this._container = document.querySelector(".container");
    this._ideas = [];
    this.getIdeas();
  }
  async getIdeas() {
    try {
      const res = await ideasApi.getIdeas();
      this._ideas = res.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  addIdea(idea) {
    this._ideas.unshift(idea);
    this.render();
  }

  async deleteIdea(IdeaId) {
    try {
      await ideasApi.delete(IdeaId);
      this._ideas.filter((idea) => idea.id !== IdeaId);
      this.getIdeas();
    } catch (err) {
      console.log(err);
    }
  }

  addEventListeners() {
    this._container.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-xmark")) {
        e.stopPropagation();
        const IdeaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(IdeaId);
      }
    });
  }

  render() {
    this._container.innerHTML = this._ideas
      .map((idea) => {
        return `<div class="card" data-id="${idea._id}">
        <button>
          <i class="fa-solid fa-xmark fa-lg" style="color: #e90707"></i>
        </button>
        <p class="text">
        ${idea.text}
        </p>
        <div class="tag ${this.colorTag()}">
          <h5>${idea.tag.toUpperCase()}</h5>
        </div>
        <div class="card-footer">
          <p><b>Posted on </b>${idea.Date.split("T")[0]} <b>by ${
          idea.username
        }</b></p>
        </div>
      </div>`;
      })
      .join("");
    this.addEventListeners();
  }
  colorTag() {
    const tags = ["red", "orange", "blue", "green", "default"];
    return tags[Math.floor(Math.random() * 5)];
  }
}

export default IdeaList;
