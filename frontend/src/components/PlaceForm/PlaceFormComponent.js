import React, { useEffect, useState } from "react";
import MyInput from "../../UI/MyInput/MyInput";
import MyTextarea from "../../UI/MyTextarea/MyTextarea";
import Rating from "../Rating/Rating";
import MyButton from "../../UI/MyButton/MyButton";
import Notification from "../Notification/Notification";
import placeService from "../../service/placeService";


const PlaceFormComponent = ({
        place, formTitle,
        btnName, addNewPlace
        }) => {

    const [placeName, setPlaceName] = useState('');
    const [placeLocation, setPlaceLocation] = useState('');
    const [placeDescription, setPlaceDescription] = useState('');
    const [placePicture, setPlacePicture] = useState('');
    const [placeRating, setPlaceRating] = useState(0);

    const [successMessage, setSuccessMessage] = useState(null);
    const [formErrorMessage, setFormErrorMessage] = useState(null);

    
    const setFile = event => {
        const file = event.target.files[0];
        setPlacePicture(file);

    }

    let isToEdit = Object.keys(place).length !== 0;

    useEffect(() => {
        if (isToEdit) {
            setPlaceName(place.name);
            setPlaceLocation(place.location);
            setPlaceDescription(place.description);
            setPlaceRating(place.rating);
        }
    }, [place]) 


    const submit = (event) => {
        event.preventDefault();

        let formData = new FormData();

        formData.append('name', placeName);
        formData.append('description', placeDescription);
        formData.append('location', placeLocation);
        formData.append('rating', placeRating);

        if (placePicture) {
            formData.append('picture', placePicture, placePicture.name);
        }

        if (!isToEdit) {
            placeService
                .createPlace(formData)
                .then(({place}) => {
                    addNewPlace(place);

                    setPlaceName('');
                    setPlaceDescription('');
                    setPlaceLocation('');
                    setPlaceRating(0);
                    setPlacePicture('')

                    setSuccessMessage('Place item sussessfuly created');

                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 7000)

                })
                .catch(error => {
                    console.log(error)
                    const errorData = error.response.data.errors;
                    setFormErrorMessage(errorData.map(error =><div key={error}>{error}</div> ));
                    
                    setTimeout(() => {
                        setFormErrorMessage(null);
                    }, 7000)
                });
            
        } else {
            placeService
                .updatePlace(place._id, formData)
                .then(({place}) => {
                    //console.log(place);
                    setSuccessMessage('Place item sussessfuly updated');

                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 7000)

                })
                .catch(error => {
                    const errorData = error.response.data.errors;
                    setFormErrorMessage(errorData.map(error =><div key={error}>{error}</div> ));
                    
                    setTimeout(() => {
                        setFormErrorMessage(null);
                    }, 7000)
                });
        }


    }

    return (
        <div className="place-form-container">
            <div className="place-form">
                <h2 className="form-title">
                    {formTitle} 
                </h2>
                <form onSubmit={submit}>
                    <div className="form-control">
                        <label htmlFor="place-name-input">Name</label>
                        <MyInput  
                            type="text"
                            value={placeName}
                            onChange={e => setPlaceName(e.target.value)}
                            placeholder="Enter place name"
                            id="place-name-input"
                        />
                    </div>


                    <div className="form-control">
                        <label htmlFor="place-location-input">Location</label>
                        <MyInput
                            id="place-location-input"  
                            type="text"
                            value={placeLocation}
                            onChange={e => setPlaceLocation(e.target.value)}
                            placeholder="Enter place location"
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="place-rating-input">Rating</label>
                        <Rating 
                            id="place-rating-input"
                            setRating={(rating) => setPlaceRating(rating)}
                            placeRating={placeRating}
                        />

                    </div>            

                    <div className="form-control">
                        <label htmlFor="place-file-picture" className="picture-label">
                            Add file
                        </label>
                        <span>{placePicture.name}</span>
                        <input
                            accept="image/*"
                            onChange={setFile} 
                            type="file" id="place-file-picture"/>
                    </div>

                    <div className="form-control">
                        <label htmlFor="place-description-input">Description</label>
                        <MyTextarea
                            id="place-description-input"
                            value={placeDescription}
                            onChange={e => setPlaceDescription(e.target.value)}
                        ></MyTextarea>
                    </div>

                    <Notification message={formErrorMessage}  msgType="formError"/> 
                    <Notification message={successMessage}  msgType="success"/>                    

                    <MyButton type="submit">
                        {btnName}
                    </MyButton>
                    
                </form>

            </div>
            
        </div>
    )
}

export default PlaceFormComponent;