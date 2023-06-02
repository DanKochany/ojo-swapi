import SwapiModel from '../model/SwapiModel';

const swapiModel = new SwapiModel();

export default class SwapiController {
  async getMovies(value?: number) {
    return await swapiModel.getMovies(value).then((data) => {
      return data.data.results;
    });
  }

  async getCharacters(page: number) {
    return await swapiModel.getCharacters(page).then((data) => {
      return data.data.results;
    });
  }
}
