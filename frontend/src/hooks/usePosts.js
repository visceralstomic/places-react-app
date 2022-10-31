import { useMemo } from "react";


const useSortList = (places, sort, order) => {
    return useMemo(() => {
        return sort ? [...places].sort((a,b) => {
            if (sort === 'rating') {
                return order !== "desc" ? a[sort] - b[sort] : b[sort] - a[sort];
            }
            return  order !== "desc" ? a[sort].localeCompare(b[sort]) : b[sort].localeCompare(a[sort]);
        }) : places;
    }, [places, sort, order])
}


export const useFilterList = (places, sort, query, order) => {
    const sortedList = useSortList(places, sort, order);
    return useMemo(() => {
        return sortedList.filter(
            place => place.name.toLowerCase().includes(query.toLowerCase())
        )
    }, [sortedList, query])
}

