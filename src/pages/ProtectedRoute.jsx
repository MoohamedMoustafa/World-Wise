import { useAuthContext } from '../contexts/FakeAuthContext'
import Login from './Login';


export default function ProtectedRoute({children}) {
    const {isLoggedin} = useAuthContext();

    if(!isLoggedin) return <Login />
    return children
}
