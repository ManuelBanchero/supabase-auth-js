import { createRoot } from 'react-dom/client'
import AuthContextProvider from './context/AuthContext'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router'


createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <RouterProvider router={router} />
    </AuthContextProvider>
)