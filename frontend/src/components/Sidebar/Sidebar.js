import React from "react";
import "./sidebar.css";
import MyButton from "../../UI/MyButton/MyButton";
import MySelect from "../../UI/MySelect/MySelect";
import MyInput from "../../UI/MyInput/MyInput";



const Sidebar = ({setVisible, setSort, sort, 
    order, setOrder, query, setQuery,
    limit, setLimit }) => {


    return (
        <div className="sidebar-container">
            <div className="sidebar-content">
                <MyButton onClick={() => setVisible(true)}>
                    Place item form
                </MyButton>
                <MySelect
                    value={sort} 
                    defaultValue='Sort'
                    options={[
                        {value: 'location', name:'By location'},
                        {value: 'name', name: 'By name'},
                        {value: 'rating', name: 'By rating'}
                    ]}
                    onChange={sortVal => setSort(sortVal) }
                />
                <MySelect
                    value={order} 
                    defaultValue='Order'
                    options={[
                        {value: 'asc', name:'Ascending'},
                        {value: 'desc', name: 'Descending'}
                    ]}
                    onChange={ord => setOrder(ord) }
                />

                <MySelect 
                    value={limit}
                    onChange={lim => setLimit(lim)}
                    defaultValue='Set page limit'
                    options={[
                        {value: 2, name: "2"},
                        {value: 5, name: "5"},
                        {value: 10, name: "10"},
                        {value: 25, name: "25"},
                    ]}
                />
                <MyInput 
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search..."
                />
            </div>
        </div>
    )
}



export default Sidebar;
