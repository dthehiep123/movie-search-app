import { useEffect, useState } from 'react';

import './App.css';
import Search from './components/search/SearchBar';
import MovieList from './components/movies/MovieList';
import PageList from './components/pages/PageList';

import useMovieSearch from './hooks/useMovieSearch'

const App = () => {

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [submittedQuery, setSubmittedQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    movies,
    suggestions,
    isLoading,
    error,
    totalPages,
    fetchMovies,
    fetchSuggestions
  } = useMovieSearch();

  useEffect(() => {
    if (submittedQuery) {
      fetchMovies(submittedQuery, currentPage);

      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }, [submittedQuery, currentPage, fetchMovies]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  }

  const handleSubmit = () => {
    if (searchQuery.trim()) {
      setSubmittedQuery(searchQuery);
      setCurrentPage(1);
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  const showResults = submittedQuery && !isLoading;
  const showPagination = showResults && movies.length > 0 && totalPages > 1;

  return (
    <div className='relative bg-white min-h-screen overflow-x-hidden'>
      <Search 
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        onSubmit={handleSubmit}
        suggestions={suggestions}
        onFetchSuggestions={fetchSuggestions}
        isLoading={isLoading}
      />
      {error && (
        <div className="text-center text-red-500 p-4">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center p-8">
          <div className="text-lg">Loading...</div>
        </div>
      )}

      {showResults && movies.length > 0 && (
        <MovieList movies={movies}/>
      )
        
      }

      {showPagination && (
        <PageList 
         currentPage={currentPage}
         totalPages={totalPages}
         onPageChange={handlePageChange}
          />
      )

      }
      
    </div>
  )
}

export default App
