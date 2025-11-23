import type { MovieSearch } from "../../utils/constants";

type MovieSuggestionProps = {
    movieList: MovieSearch[];
}

const SearchSuggestions = ({movieList}: MovieSuggestionProps) => {

    return (
        <div className=
                    {`flex
                    absolute inset-x-0 top-full
                    z-1000
                    bg-black/50
                    h-fit
                    backdrop-blur-sm
                    justify-center
                    `}
                    
        >
            <div className="
                relative
                my-2 
                w-[500px]
                bg-white rounded-lg
                p-3 shadow-xl
                z-1000">
                {movieList.map((movie, index) => (
                    <div key={index}
                    className="w-full 
                        flex items-center 
                        gap-3 p-2 
                        hover:bg-gray-200
                        rounded 
                        cursor-pointer 
                        mb-2">
                    <img 
                        src={movie.poster_path} 
                        alt="name" 
                        className="w-auto h-40 object-cover rounded-md"/>
                    <p className="font-semibold 
                            text-[20px] text-top
                            text-gray-800">
                            {movie.title}
                    </p>
                </div>
                ))}
                
            </div>
        </div>
    )
}

export default SearchSuggestions;