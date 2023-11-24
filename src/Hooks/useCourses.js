
import { useQuery } from 'react-query'

function useCourses() {
    return useQuery("courses", () =>
        fetch(`http://localhost:4000/v1/courses`).then((res) => res.json())
    )
}


export default useCourses