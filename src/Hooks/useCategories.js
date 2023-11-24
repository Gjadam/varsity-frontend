
import { useQuery } from 'react-query'

function useCategories() {
    return useQuery("categories", () => fetch(`http://localhost:4000/v1/category`).then(res => res.json()))
}

export { useCategories }