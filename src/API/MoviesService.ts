import axios from 'axios';

export default class MoviesService {
  static async getPopular(query = 'popular', page: number) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${query}?api_key=${import.meta.env.VITE_APP_APY_KEY}`,
      {
        params: {
          language: 'en-US',
          page,
        },
      }
    );
    return response;
  }

  static async searchMovie(search = '', page = 1) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_APP_APY_KEY}`,
      {
        params: {
          language: 'en-US',
          page,
          query: search,
          include_adult: false,
        },
      }
    );
    return response;
  }

  static async getMovieById(id: number) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_APP_APY_KEY}`,
      {
        params: {
          language: 'en-US',
        },
      }
    );
    return response;
  }

  static async getTrailerByMovieId(id: number) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_APP_APY_KEY}`,
      {
        params: {
          language: 'en-US',
        },
      }
    );
    return response;
  }

  static async getActorsByMovieId(id: number) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${
        import.meta.env.VITE_APP_APY_KEY
      }`,
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
