import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import SignIn from './components/Signin'
import SignUp from './components/Signup'
import Home from './routes/HomePage'
import RootRedirect from './routes/RootRedirect'
import './styles/index.css'

export const router = createBrowserRouter(createRoutesFromElements(
        <>
            <Route path='/' element={<RootRedirect />}/>
            <Route path='/signin' element={<SignIn />}/>
            <Route path='/signup' element={<SignUp />}/>

            <Route element={<ProtectedRoute />}>
                <Route path='/home' element={<Home />}/>
            </Route>
        </>
))