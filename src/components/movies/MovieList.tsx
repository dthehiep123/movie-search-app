import MovieCard from "./MovieCard";

import type { Movie } from "../../types/movie.type";

type MovieListProp = {
    movies: Movie []
}

const MovieList = ({movies}: MovieListProp) => {
    
    return (
        <div className="
                grid grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-4 p-4 
                m-1 min-w-0
            ">
            {movies.map((movie, index) => (
                <MovieCard 
                    key={index}
                    MovieProps={movie}/>
                    
                ))
            }
        </div>
    )
}

export default MovieList;