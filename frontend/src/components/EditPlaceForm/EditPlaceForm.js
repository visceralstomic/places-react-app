import React from "react";
import PlaceFormComponent from "../PlaceForm/PlaceFormComponent";


const EditPlaceForm = ({place}) => {


    return (
        <PlaceFormComponent 
            place={place}
            btnName="Update place"
            formTitle="Edit place form"
        />
    )
}

export default EditPlaceForm;