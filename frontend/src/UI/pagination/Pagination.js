import React from "react";
import cl from "./pagination.module.css";




const Pagination = ({pageArr, page, setPage}) => {
    return (
        <div className={cl.pageWrap}>
            {pageArr.map(pageNum => {
                return <span
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`${cl.pageItem} ${page === pageNum && cl.pageItemActive}`}
                        >
                        {pageNum}
                       </span>
            }) } 
        </div>
    )
}


export default Pagination;