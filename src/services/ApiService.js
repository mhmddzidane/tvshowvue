import axios from "axios";

export class ApiService {
  static serverUrl = "https://api.tvmaze.com";

  static getAllShows() {
    let dataUrl = `${this.serverUrl}/shows`;
    return axios.get(dataUrl);
  }

  static getDetailShows(id) {
    let dataUrl = `${this.serverUrl}/shows/${id}`;
    return axios.get(dataUrl);
  }

  static getShowCast(id) {
    let dataUrl = `${this.serverUrl}/shows/${id}/cast`;
    return axios.get(dataUrl);
  }

  static getSearchQuery(query) {
    let dataUrl = `${this.serverUrl}/search/shows?q=${query}`;
    return axios.get(dataUrl);
  }

  static getShowEpisode(id) {
    let dataUrl = `${this.serverUrl}/shows/${id}/episodes`;
    return axios.get(dataUrl);
  }
}
