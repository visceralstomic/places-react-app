import React, { useEffect, useState } from "react";
import "./rating.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular} from '@fortawesome/fontawesome-svg-core/import.macro' 



const RatingItem = ({idx, ratingMark, ...props}) => {
    return <FontAwesomeIcon
                className="rating-star"
                icon={ratingMark > idx - 1 ? solid('star') : regular('star')}
                {...props}            
            /> 
}


const RatingComponent = ({ratingMark}) => {
    return (
        <div>
            {[...Array(5)].map((el, idx) => {
                return <RatingItem
                            key={idx}
                            idx={idx}
                            ratingMark={ratingMark}
                        />
            })}                
        </div>
    )
}




const Rating = ({setRating, placeRating}) => {
    const [ratingMark, setRatingMark] = useState(-1);
    useEffect(() => {
        if (placeRating)
            setRatingMark(placeRating-1)
    }, [placeRating]) 
    return (
        <div>
            {[...Array(5)].map((el, idx) => {
                return <RatingItem
                            key={idx}
                            idx={idx}
                            ratingMark={ratingMark}
                            onMouseEnter={() => setRatingMark(idx)}
                            onMouseLeave={() => setRatingMark(placeRating-1)}
                            onClick={() => setRating(idx + 1)}
                        />
            })}                
        </div>
    )
}




export {RatingComponent};
export default Rating;