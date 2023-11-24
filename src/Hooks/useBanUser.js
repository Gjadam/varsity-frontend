import { useMutation, useQueryClient } from "react-query"
import swal from "sweetalert"

const localStorageData = JSON.parse(localStorage.getItem('user'))

function useBanUser() {

    return useMutation((userID) => {
        return fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    swal({
                        title: "کاربر با موفقیت بن شد.",
                        icon: 'success',
                        buttons: 'قبول'
                    })
                }
            })
    })
}

export default useBanUser