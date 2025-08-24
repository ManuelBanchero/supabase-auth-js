import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'


function ProtectedRoute() {
    const { session } = useContext(AuthContext)

    if (session === undefined)
        return <h1>Loading...</h1>

    return session ? <Outlet /> : <Navigate to="/signin" />
}

export default ProtectedRoute