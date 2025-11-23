import type { Movie } from "../../utils/constants";

import {
    BASE_IMG_URL
} from "../../utils/constants";

type MovieProps = {
    MovieProps: Movie
}

const MovieCard = ({MovieProps}: MovieProps) => {

    return (
        <div className="
            flex h-[160px]
            rounded-[6px]
            bg-white 
            shadow-sm border border-gray-200
            overflow-hidden
            group shadow-black-100/100
            hover:shadow-lg
            transition-all
            cursor-pointer
            " 
            
            >
    
            <img className="
                w-auto h-full
                object-cover 
                "
                
                src={MovieProps.poster_path ? 
                    `${BASE_IMG_URL}${MovieProps.poster_path}`
                    : 
                    "/poster_default.png"}
                alt="poster" 
            />

        
            <div className="flex flex-col justify-between p-2 w-full">
                
                {/* title */}
                <p className="text-[20spx] font-bold 
                            leading-tight text-gray-800
                            line-clamp-3">
                    {MovieProps.title}
                </p>

                {/* release date */}
                <div className="flex justify-between 
                                items-end w-full 
                                border-t border-gray-300 
                                pt-1 mt-1">
                    <p className="text-[13px] text-gray-500">
                        {MovieProps.release_date.split('-').reverse().join('-')}
                    </p>
                    
                    {/* Rate */}
                    <div className="flex items-center 
                                    min-w-0
                                    justify-center
                                    bg-yellow-300 
                                    border border-solid border-black-100 
                                    p-1 w-6 h-6 
                                    rounded-full">
                        <p className="text-[11px] font-bold text-gray-700">
                            {MovieProps.vote_average.toFixed(1)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;