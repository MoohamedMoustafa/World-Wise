import { lazy } from 'react';
import { useAuthContext } from '../contexts/FakeAuthContext'
// import Login from './Login';

const Login = lazy(() => import('./Login'));

export default function ProtectedRoute({children}) {
    const {isLoggedin} = useAuthContext();

    if(!isLoggedin) return <Login />
    return children
}
