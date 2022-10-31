import React, { useEffect, useState } from "react";
import Main from "../components/Main/Main";
import PlaceForm from "../components/PlaceForm/PlaceForm";
import PlacesList from "../components/PlacesList/PlacesList";
import Loader from "../UI/Loader/Loader";
import placeService from "../service/placeService";
import Modal from "../UI/Modal/Modal";
import Sidebar from "../components/Sidebar/Sidebar";
import Pagination from "../UI/pagination/Pagination";
import { useFilterList } from "../hooks/usePosts";



const UserPage = props => {
    const [placesList, setPlacesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [sort, setSort] = useState('');
    const [order, setOrder] = useState('');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2);
    const [totalPages, setTotalPages] = useState(0);


    const getPagesArr = () => {
        let pagesArr = [];

        for (let i = 1; i <= totalPages; i++) {
            pagesArr.push(i)
        }

        return pagesArr;
    }

    const pagesArr = getPagesArr();



    const filteredList = useFilterList(placesList, sort, query, order);



    useEffect(() => {
        placeService
            .getAllPlaces(page, limit)
            .then(({places, generalNumberOfItems}) => {
                setTotalPages(Math.ceil(generalNumberOfItems / limit)); 
                setPlacesList(places);
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }, [page, limit])

    const addNewPlace = newPlace => {
        if (totalPages > 1) {
            const newPlaceList = [...placesList];
            newPlaceList.pop();
            console.log(newPlaceList)
            setPlacesList([newPlace, ...newPlaceList]);
        } else {
            setPlacesList([newPlace, ...placesList]);
        }
        
    }

    const deleteItem = id => {
        if (window.confirm('Are you sure you want to delete this item?') ) {
            placeService
                .deletePlaceItem(id)
                .then(data => {
                    setPlacesList(placesList.filter(place => place._id !== id));
                })
                .catch(error => console.log(error))
        }
        
    }

    return (            
            <Main>  
                <div className="user-page">
                    <Sidebar 
                        setVisible={setVisible}
                        setSort={setSort}
                        sort={sort}

                        order={order}
                        setOrder={setOrder}

                        query={query}
                        setQuery={setQuery}

                        limit={limit}
                        setLimit={setLimit}
                    />

                    <Modal
                        visible={visible}
                        setVisible={setVisible}
                    >             

                        <PlaceForm 
                            addNewPlace={addNewPlace}
                        />
                    </Modal>
                    {isLoading ? (
                        <Loader />
                    ) : (

                        <div className="user-page-content">

                            <Pagination 
                                page={page}
                                pageArr={pagesArr}
                                setPage={setPage}
                            />

                            <PlacesList 
                                places={filteredList}
                                deleteItem={deleteItem} 
                            />
                        </div>        
                        
                    )}

                </div>
            </Main>
        
    )
}


export default UserPage;