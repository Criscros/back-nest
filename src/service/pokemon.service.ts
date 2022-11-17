import axios, { AxiosInstance } from 'axios';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const qs = require('qs');
export class PokemonService {
  PokemonService: AxiosInstance;

  constructor() {
    this.PokemonService = axios.create({
      baseURL: process.env.MS_POKEMON,
      timeout: 3000,
      responseType: 'json'
    })
  }

  getPokemons(path: string) {
    return new Promise((resolve, reject) => {
      this.PokemonService
        .get(path)
        .then((success) => {
            resolve(success.data);
          },
          (error) => {
            reject(error);
          },
        );
    });
  }
}
