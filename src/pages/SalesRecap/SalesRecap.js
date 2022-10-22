import Header from "../../components/Header"
import BottomBar from "../../components/BottomBar"
import SalesRow from "../../components/SalesRow"
import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react"
const SalesRecap = () => {
    const products = useSelector((state) => state.products.products)
    const isLoginAdmin = useSelector((state) => state.login.isLoginAdmin)

    const [totalSold, setTotalSold] = useState(0)

    const setTotal = () => {
        let temp = 0
        products.forEach((product) => {
            temp += (product.productSold * product.price)
        })
        setTotalSold(temp)
    }

    useEffect(() => {
        setTotal()
    }, []);

    // If not Admin Logged In go to Home (User) Page 
    if(!isLoginAdmin){
        return <Navigate to="/" />

    // If Admin Logged In Display Home (Admin) Page
    } else {
        return(
            <div className="w-11/12 flex justify-center mt-20 flex-col text-quaternary break-words mb-20">
                <Header>Sales Recap</Header>

                {/* Product Display */}
                {products.map((product) => (
                    <SalesRow key={product.id} img={product.image} title={product.title} price={product.price} productSold={product.productSold} />
                ))}

                {/* Bottom (idk what's the name) */}
                <BottomBar>
                    <h3 className="w-2/6 md:text-xl text-center">Total</h3>
                    <h4 className="w-4/6 md:text-xl text-center">US$ {totalSold}</h4>
                </BottomBar>
            </div>
        )
    }
}
export default SalesRecap