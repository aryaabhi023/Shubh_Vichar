import axios from "axios";

class IdeasApi {
  constructor() {
    this._apiUrl = "/api/ideas";
  }
  getIdeas() {
    return axios.get(this._apiUrl);
  }
  createIdea(idea) {
    return axios.post(this._apiUrl, idea);
  }
  delete(id) {
    return axios.delete(`${this._apiUrl}/${id}`);
  }
}

export default new IdeasApi();
