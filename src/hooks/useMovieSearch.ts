import { useCallback, useState } from "react";
import { searchMovies, formatSuggestions } from "../services/movieApi";
import type { Movie, MovieSearch } from "../types/movie.type";

type UseMovieSearchReturn = {
    movies: Movie [],
    suggestions: MovieSearch[],
    isLoading: boolean,
    error: string | null,
    totalPages: number,
    fetchMovies: (query: string, page: number) => void,
    fetchSuggestions: (query: string) => void
}

const useMovieSearch = ():UseMovieSearchReturn => {
    const [movies, setMovies] = useState<Movie []>([]);
    const [suggestions, setSuggestions] = useState<MovieSearch []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(0);

    const fetchMovies = useCallback(async (query: string, page: number) => {
        if (!query.trim()) {
            setMovies([]);
            setTotalPages(0);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const data = await searchMovies(query, page);
            setMovies(data.results);
            setTotalPages(data.total_pages);
        } catch (err) {
            setError("Try again!");
            setMovies([]);
            setTotalPages(0);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [])

    const fetchSuggestions = useCallback(async (query: string) => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        try {
            const data = await searchMovies(query, 1);
            const formatted = formatSuggestions(data.results, 4);
            setSuggestions(formatted);
        } catch (err) {
            setSuggestions([]);
            console.error(err);
        }
    }, [])

    return {
        movies,
        suggestions,
        isLoading,
        error,
        totalPages,
        fetchMovies,
        fetchSuggestions
    };
}

export default useMovieSearch;

