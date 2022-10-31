import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import placeServie from "../service/placeService";
import EditPlaceForm from "../components/EditPlaceForm/EditPlaceForm";
import Main from "../components/Main/Main";
import Loader from "../UI/Loader/Loader";

const EditPage = props => {
    const [place, setPlace] = useState({});
    const [isLoading, setIsLoading] = useState(true); 
    const {id} = useParams();
    
    useEffect(() => {
        placeServie
            .getPlaceItem(id)
            .then(({place}) => {
                setPlace(place);
                setIsLoading(false)
            })
            .catch(error => console.log(error));
    }, [id])

    return (
        <Main>
            {isLoading ? (
                <Loader />
            ) : (
                <EditPlaceForm place={place} />
            )}
            
        </Main>
       
    )
}

export default EditPage;