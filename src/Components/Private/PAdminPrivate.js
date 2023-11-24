import React, { useContext } from 'react'
import AuthContext from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
export default function PAdminPrivate({ children }) {

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <>
        {
            authContext.userInfos.role === 'ADMIN' ? <>{children}</> : navigate('/login')
        }
        </>
    )
}
