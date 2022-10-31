import React from "react";
import "./placeForm.css";
import PlaceFormComponent from "./PlaceFormComponent";

const PlaceForm = ({addNewPlace}) => {    

    return (
        
        <PlaceFormComponent 
            place={{}}
            formTitle="Create place form"
            btnName="Create place"
            addNewPlace={addNewPlace}
        />
    )
}


export default PlaceForm;