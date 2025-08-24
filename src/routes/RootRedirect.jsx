import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

function RootRedirect() {
    const { session } = useContext(AuthContext)

    if (session === undefined)
        return <div>Loading...</div>
    
    return session ? <Navigate to="/home"/> : <Navigate to="/signin"/>
}

export default RootRedirect