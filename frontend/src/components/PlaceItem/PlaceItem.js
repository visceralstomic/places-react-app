import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MyButton from "../../UI/MyButton/MyButton";
import { RatingComponent } from "../Rating/Rating";
import "./placeItem.css";



const PlaceItem = ({place, deleteItem}) => {
    const navigate = useNavigate();
    return (
        <div className="place-item">
            <div className="place-header">
                <div className="place-info">
                    <div>
                        Name: {place.name}
                    </div>
                    <div>
                        Location: {place.location}
                    </div>
                    <div>
                        Rating
                        <RatingComponent 
                            ratingMark={place.rating - 1}
                        />
                    </div>
                </div>
                <div className="place-picture">
                    <img src={`http://localhost:5000/images/places/${place.picture}`}/>
                </div>
            </div>
            <div className="place-description">
                {place.description}
            </div>
            <div className="place-buttons">
                <MyButton onClick={() => navigate(`/place/edit/${place._id}`)}>Edit</MyButton>
                <MyButton
                    style={{
                        color: "white",
                        backgroundColor: "crimson"
                    }} 
                    onClick={() => deleteItem(place._id)}
                >Delete</MyButton>
            </div>
        </div>
    )
}

export default PlaceItem;