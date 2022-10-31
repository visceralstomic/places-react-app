import React from "react";
import PlaceItem from "../PlaceItem/PlaceItem";
import "./placesList.css"

const PlacesList = ({places, deleteItem}) => {
    return (
        <div className="places-list">
            {places.length === 0 ? (
                <div>
                    List is empty
                </div>
            ) : (
                places.map(place => <PlaceItem deleteItem={deleteItem} 
                                            key={place._id} place={place} /> )
            )}
        </div>
    )
}


export default PlacesList;