import { useMemo } from "react";

export const useSort = (users, filter) =>{
    let sorted =  useMemo(() => {
            return [...users].sort((a, b) => b[filter]- a[filter])
    }, [users, filter]);
    return sorted
}
