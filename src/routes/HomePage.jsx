import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Home() {
    const { signOut, session } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    async function logOut() {
        setIsLoading(true)
        const { success, error } = await signOut()

        if (error) {
            setIsLoading(false)
            return setError(new Error(error))
        }

        if (success) {
            navigate('/signin')
            return
        }

        return setIsLoading(false)
    }

    const accountTypes = {
        admin: 'Admin',
        user: 'User'
    }

    return (
        <>
            <h1>Home</h1>
            <h3>User data:</h3>
            <p>{accountTypes[session?.user.user_metadata['account_type']]}</p>
            <p>{session?.user.user_metadata.name}</p>
            <button onClick={logOut}>{isLoading ? 'Loging out' : 'Log out'}</button>
            {error && error.message}
        </>
    )
}

export default Home