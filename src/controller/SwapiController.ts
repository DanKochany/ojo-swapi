import SwapiModel from '../model/SwapiModel';

const swapiModel = new SwapiModel();

export default class SwapiController {
  async getMovies(value?: number) {
    return await swapiModel.getMovies(value).then((data) => {
      return data;
    });
  }

  async getCharacters(page: number) {
    return await swapiModel.getCharacters(page).then((data) => {
      return data;
    });
  }

  async getCharactersById(id: number){
    return await swapiModel.getCharactersById(id).then((data)=>{
      return data
    })
  }

  public postReview(data: any){
    return swapiModel.postReview(data)
  }
}
