import { Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"
import {  useDispatch } from "react-redux"
import { setIsLogin, setIsLoginAdmin } from "../../features/loginSlice"
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [isFailed, setIsFailed] = useState(false)
    
    const handleLoginAdmin = () => {
        setIsLoading(false)
        localStorage.setItem("tokenAdmin", "yes this is admin token")
        dispatch(setIsLoginAdmin())
        navigate('/')
    }

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch('https://fakestoreapi.com/auth/login',{
                method:'POST',
                headers: {
                    "access-control-allow-origin" : "*",
                    "Content-type": "application/json; charset=UTF-8"
                },
                body:JSON.stringify({
                    username,
                    password
                })
            })
            const token  = await response.json()
            setIsLoading(false)
            localStorage.setItem("token", token.token)
            setIsFailed(false)
            dispatch(setIsLogin())
            navigate('/')
        } catch (error) {
            setIsLoading(false)
            setIsFailed(true)
        }
    }

    // If no Token Display Login Page
    if (!localStorage.getItem("token") && !localStorage.getItem("tokenAdmin")) {
        return(
            <div className="h-screen w-screen text-quaternary flex justify-center items-center break-words">
                <div className="w-11/12 md:w-96 bg-tertiary flex flex-col p-4 rounded-xl border-4 border-secondary">
                    <header>
                        <h1 className="text-center text-3xl font-extrabold py-3 border-b-4"><i>AqMwBlanja</i></h1>
                    </header>

                    <main className="my-3">
                        <h2 className="text-center mb-3 text-xl font-bold">LOGIN</h2>

                        {/* If handleLogin is Error */}
                        {isFailed && (
                            <p className=" text-red-700">username or password is wrong</p>
                        )}

                        {/* Form for Submiting Username and Password */}
                        <form className="flex flex-col" onSubmit={(event) => {
                            if(usernameValue === "admin@bukapedia.com" && passwordValue === "admin123"){
                                setIsFailed(false)
                                setIsLoading(true)
                                setTimeout(() => {
                                    handleLoginAdmin()
                                }, 800);
                                event.preventDefault()
                            } else{
                                setIsFailed(false)
                                setIsLoading(true)
                                handleLogin(usernameValue, passwordValue)
                                event.preventDefault()
                            }
                        }}>
                            {/* Username Input */}
                            <label>Username:</label>
                            <input value={usernameValue} onChange={(event) => setUsernameValue(event.target.value)} type="text" className="text-primary p-1 rounded" />

                            {/* Password Input */}
                            <label className="mt-3">Password:</label>
                            <input value={passwordValue} onChange={(event) => setPasswordValue(event.target.value)} type="password" className="text-primary p-1 rounded" />

                            {/* Input Button */}
                            <input disabled={isLoading || usernameValue === '' || passwordValue === ''} type="submit" value={isLoading ? 'Logging in...' : 'Login'} className="bg-primary mt-4 p-2 rounded-lg active:bg-black md:hover:cursor-pointer md:hover:outline-quaternary md:hover:outline disabled:bg-primary/50 disabled:text-quaternary/50 disabled:hover:outline-none disabled:hover:cursor-default" />
                        </form>
                    </main>
                </div>
            </div>
        )
    
    // If There go to Home Page
    } else{
        return <Navigate to="/" />
    }
    
}
export default Login