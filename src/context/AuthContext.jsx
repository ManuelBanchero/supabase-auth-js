import { createContext, useEffect, useState } from 'react'
import supabase from '../supabase-client'

const AuthContext = createContext()

function AuthContextProvider({ children }) {
    const [session, setSession] = useState(undefined)

    useEffect(() => {
        async function getInitialSession() {
            try {
                const { data, error } = await supabase.auth.getSession()
                if (error) 
                    throw error

                setSession(data.session)
                
            } catch(error) {
                console.error('Error getting session: ', error.message)
            }
        }
        getInitialSession()

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.toLowerCase(),
                password
            })

            if (error) {
                console.error('Supabase sign-in error: ', error.message)
                return { success: false, error: error.message }
            }
            
            return { success: true, data }

        } catch(error) {
            console.error('Unexpected error during sign-in: ', error.message)
            return { success: false, error: 'Aun unexpected erorr ocurred. Please try again.'}
        }
    }

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) {
                console.error('Suapase sign-out error: ', error.message)
                return { success: false, error: error.message }
            }

            return { success: true }

        } catch(error) {
            console.error('Unexpected error during sign-out: ', error.message)
            return { success: false, error: 'An unexpected error ocurred during sign out. Please try again.'}
        }
    }

    const signUpNewUser = async (email, password, name, accounType) => {
        try {
            const { data ,error } = await supabase.auth.signUp({
                email: email.toLowerCase(),
                password,
                options: {
                    data: {
                        name,
                        account_type: accounType
                    }
                }
            })

            if (error) {
                console.error('Supabase sign-up error: ', error.message)
                return { success: false, error: error.message }
            }

            return { success: true, data }
        } catch(error) {
            console.error('Unexpected error duing sign-up: ', error.message)
            return { success: false, error: 'An unexpected error ocurred during sign up. Please try again.' }
        }
    }

    return (
        <AuthContext.Provider value={{ session, signInUser, signOut, signUpNewUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
export { AuthContext }