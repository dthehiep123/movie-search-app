import axios from "axios";

import type { SearchResponse, MovieSearch } from "../types/movie.type";

import { URL_API, TOKEN_API, BASE_IMG_URL } from "../utils/constants";

const apiClient = axios.create({
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${TOKEN_API}`
    }
});

export const searchMovies = async (
    query: string,
    page: number = 1
) => {
    const response = await apiClient.get<SearchResponse>(URL_API, {
        params: {
            query,
            include_adult: false,
            page
        }
    })

    return response.data;
};

export const formatSuggestions = (
    results: SearchResponse['results'],
    limit: number = 4
): MovieSearch [] => {
    return results.slice(0, limit).map((movie) => ({
        poster_path: movie.poster_path
        ? `${BASE_IMG_URL}${movie.poster_path}`
        : './poster_default.png',
        title: movie.title
    }));
};

