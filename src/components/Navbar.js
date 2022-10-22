import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { setIsLogin, setIsLoginAdmin } from "../features/loginSlice"
const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isLogin = useSelector((state) => state.login.isLogin)
    const isLoginAdmin = useSelector((state) => state.login.isLoginAdmin)

    const [isNavExpanded, setIsNavExpanded] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("tokenAdmin")
        dispatch(setIsLogin())
        dispatch(setIsLoginAdmin())
        navigate("/")
    }

    return(
        <nav className="w-full bg-secondary p-4 text-quaternary flex flex-col md:flex-row md:items-center fixed z-10 top-0">
            <div className="flex flex-row justify-between items-center md:mr-7">

                {/* Nav Brand(?)/Header */}
                <h1 className="text-2xl font-bold"><i>{isLoginAdmin ? 'Hi, Admin!' : 'AqMwBlanja'}</i></h1>

                {/* Button for Expanding Nav Link When Small Screen */}
                <button className="md:hidden text-2xl" onClick={() => {
                    setIsNavExpanded(!isNavExpanded)
                }}>
                    {!isNavExpanded ? (
                        // If not Expanded
                        <i className="fa-solid fa-chevron-down active:text-tertiary ease-in-out transition duration-170"></i>
                    ) : (
                        // If Expanded
                        <i className="fa-solid fa-chevron-down rotate-180 transition duration-170 active:text-tertiary ease-in-out"></i>
                    )}
                </button>
            </div>
            {isLoginAdmin ? (
                // Admin Nav Link
                <div className={`flex-col mt-2 text-xl md:mt-0 md:flex-row md:ml-2 md:items-center md:w-96 md:justify-between ${isNavExpanded ? 'flex' : 'hidden md:flex'}`}>
                    <Link to="/" className="font-bold hover:text-tertiary hover:ease-in-out transition duration-150" onClick={() => setIsNavExpanded(false)}>Stock Update</Link>
                    <Link to="/sales" className="font-bold hover:text-tertiary my-2 md:mx-2 md:my-0 hover:ease-in-out transition duration-150" onClick={() => setIsNavExpanded(false)}>Sales Recap</Link>
                    {isLoginAdmin ? (
                        <button onClick={() => {handleLogout(); setIsNavExpanded(false)}} className="text-start font-bold hover:text-tertiary mb-2 md:mr-2 md:mb-0 hover:ease-in-out transition duration-150">Logout</button>                    
                    ) : (
                        <Link to="/login" className="font-bold hover:text-tertiary mb-2 md:mr-2 md:mb-0 hover:ease-in-out transition duration-150" onClick={() => setIsNavExpanded(false)}>Login</Link>
                    )}
                </div>
            ) : (
                //User Nav Link
                <div className={`flex-col mt-2 text-xl md:mt-0 md:flex-row md:ml-4 md:items-center md:w-72 md:justify-between ${isNavExpanded ? 'animate-fade flex' : 'hidden md:flex'}`}>
                    <Link to="/" className="font-bold hover:text-tertiary hover:ease-in-out transition duration-150" onClick={() => setIsNavExpanded(false)}>Products</Link>
                    <Link to="/cart" className="font-bold hover:text-tertiary my-2 md:mx-2 md:my-0 hover:ease-in-out transition duration-150" onClick={() => setIsNavExpanded(false)}>Cart</Link>
                    {isLogin ? (
                        <button onClick={() => {handleLogout(); setIsNavExpanded(false)}} className="text-start font-bold hover:text-tertiary mb-2 md:mr-2 md:mb-0 hover:ease-in-out transition duration-150">Logout</button>                    
                    ) : (
                        <Link to="/login" className="font-bold hover:text-tertiary mb-2 md:mr-2 md:mb-0 hover:ease-in-out transition duration-150" onClick={() => setIsNavExpanded(false)}>Login</Link>
                    )}
                </div>
            )}
        </nav>
    )
}
export default Navbar