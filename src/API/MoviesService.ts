import axios from 'axios';

// 7b85554150a7e64123db5fbaacc462d7

export default class MoviesService {
  static async getPopular() {
    const response = await axios.get(
      'https://api.themoviedb.org/3/movie/popular?api_key=7b85554150a7e64123db5fbaacc462d7',
      {
        params: {
          language: 'en-US',
          page: 1,
        },
      }
    );
    return response;
  }

  static async searchMovie(search = '') {
    const response = await axios.get(
      'https://api.themoviedb.org/3/search/movie?api_key=7b85554150a7e64123db5fbaacc462d7',
      {
        params: {
          language: 'en-US',
          page: 1,
          query: search,
          include_adult: false,
        },
      }
    );
    return response;
  }

  static async getModieById(id: number) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=7b85554150a7e64123db5fbaacc462d7`,
      {
        params: {
          language: 'en-US',
        },
      }
    );
    return response;
  }

  static async getTrailerByModieId(id: number) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=7b85554150a7e64123db5fbaacc462d7`,
      {
        params: {
          language: 'en-US',
        },
      }
    );
    return response;
  }

  static async getActorsByModieId(id: number) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7b85554150a7e64123db5fbaacc462d7`,
      {
        params: {
          language: 'en-US',
        },
      }
    );
    return response;
  }
}

export type TGetPopular = typeof MoviesService.getPopular;
export type TSearchMovie = typeof MoviesService.searchMovie;
