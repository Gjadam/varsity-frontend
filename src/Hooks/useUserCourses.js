import React from 'react'
import { useQuery } from 'react-query'
const localStorageData = JSON.parse(localStorage.getItem('user'))

function useUserCourses() {
    return useQuery("userCourses", () => {
        return fetch(`http://localhost:4000/v1/users/courses`, {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
    })
}

export default useUserCourses