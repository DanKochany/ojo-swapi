import axios from 'axios';

const API_URL = 'https://swapi.dev/api/';

export default class SwapiModel {
  public getMovies(value?: number) {
    if (value) {
      return axios.get(`${API_URL}/films/${value}`);
    } else {
      return axios.get(`${API_URL}/films/`);
    }
  }

  public getCharacters(page: number) {
    return axios.get(`${API_URL}/people/?page=${page}`);
  }
}
