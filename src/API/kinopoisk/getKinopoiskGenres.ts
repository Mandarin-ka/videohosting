import axios from 'axios';

import { AxiosResponseGenre } from '@/types/axiosResponse';

export const getKinopoiskGenres = async (): Promise<AxiosResponseGenre> => {
  try {
    const url = 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field';
    const params = { field: 'genres.name' };

    const response: AxiosResponseGenre = await axios.get(url, {
      headers: { 'X-API-KEY': 'VK03T2G-SSR406Z-N5FFKM9-1JWHZF7' },
      params: { ...params },
    });

    return response;
  } catch (e: unknown) {
    console.error((e as Error).message);
  }
};
