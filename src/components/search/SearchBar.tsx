import { useEffect, useState } from "react";

import SearchSuggestions from "./SearchSuggestions";
import useDebounce from "../../hooks/useDebounce";
import type { MovieSearch } from "../../types/movie.type";

type SearchProps = {
    searchQuery: string,
    onSearchChange: (query: string) => void,
    onSubmit: () => void,
    suggestions: MovieSearch [],
    onFetchSuggestions: (query: string) => void,
    isLoading: boolean
}



const Search = (
    {
        searchQuery,
        onSearchChange,
        onSubmit,
        suggestions,
        onFetchSuggestions,
        isLoading

}: SearchProps) => {
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const debouncedQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (debouncedQuery.trim()) {
            onFetchSuggestions(debouncedQuery);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [debouncedQuery, onFetchSuggestions]);

    return (
        <div className="relative">
            <div className="flex justify-center">
                <input 
                className="
                    w-100
                    h-10
                    bg-gray-200
                    focus:outline-none
                    p-3
                    text-base
                    m-2
                    rounded-full
                "
                placeholder="Search for movie..."
                value={searchQuery}
                onChange={(e) => {onSearchChange(e.target.value)}}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setShowSuggestions(false);
                        onSubmit();
                    }
                }}
                disabled={isLoading}
                />
            </div>
            {showSuggestions && suggestions.length > 0 && ( 
                <SearchSuggestions movieList={suggestions} />
            )}
        </div>
    )
}

export default Search;