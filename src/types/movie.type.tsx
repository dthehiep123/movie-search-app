
export type Movie = {
    id: number,
    title: string,
    poster_path: string | null,
    overview: string,
    release_date: string,
    vote_average: number
}

export type MovieSearch = {
    poster_path: string,
    title: string
}

export type SearchResponse = {
    page: number,
    results: Movie [],
    total_pages: number,
    total_results: number
}

export type SearchState = {
    movies: Movie [],
    suggestions: MovieSearch [],
    isLoading: boolean,
    error: string | null,
    totalPages: number
}