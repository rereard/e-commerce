import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    let location = useLocation()
    if(!localStorage.getItem("token") && !localStorage.getItem("tokenAdmin")){
        return <Navigate to="/login" state={{ from: location }} />
    }
    return children
}

export default ProtectedRoute