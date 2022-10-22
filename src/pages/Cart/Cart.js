import Header from "../../components/Header"
import CartRow from "../../components/CartRow"
import BottomBar from "../../components/BottomBar"
import { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { soldProduct } from "../../features/ProductSlice"
import { deleteItem } from "../../features/cartSlice"

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isLogin = useSelector((state) => state.login.isLogin)
    const products = useSelector((state) => state.products.products)
    const cart = useSelector((state) => state.cart.items)

    const [totalPrice, setTotalPrice] = useState(0)
    const [checkedItems, setCheckedItems] = useState([])

    const setTotal = () => {
        let temp = 0
        checkedItems.forEach((item) => {
            let productPrice = products.find((product) => product.id === item.id).price
            temp += (item.total * productPrice)
        })
        setTotalPrice(temp)
    }

    useEffect(() => {
        setCheckedItems(cart.filter((item) => item.isChecked))
    }, [cart]);

    useEffect(() => {
        setTotal()
    }, [checkedItems])

    let product = {}

    // If not User Logged In go to Home (Admin) Page
    if(!isLogin){
        return <Navigate to="/" />

    // If User Logged In Display Cart Page
    } else {
        return(
            <div className="w-11/12 flex justify-center mt-20 flex-col text-quaternary break-words mb-20">
                <Header>My Cart</Header>
                <div className="w-full mt-2">

                    {/* Cart Display */}
                    {cart.map((item) => {
                        product = products.find((product) => product.id === item.id)
                        return (<CartRow key={item.id} id={item.id} image={product.image} title={product.title} price={product.price} stock={product.stock} isChecked={item.isChecked} totalItem={item.total} />)
                    })}

                    {/* Bottom (idk what's the name) */}
                    <BottomBar>
                        <h3 className="w-2/6 md:text-xl text-center">Total</h3>
                        <h4 className="w-2/6 md:text-xl md:text-center">US$ {totalPrice}</h4>
                        <button disabled={checkedItems.length === 0 ? true : false} className="w-2/6 md:text-xl text-center bg-secondary hover:text-tertiary h-full disabled:bg-secondary/50 disabled:hover:text-quaternary" onClick={() => {
                            checkedItems.forEach((item) =>{
                                dispatch(soldProduct({id: item.id, total: item.total}))
                                dispatch(deleteItem(item.id))
                                navigate('/')
                            })
                        }}>
                            Checkout <i className="fa-solid fa-bag-shopping"></i>
                        </button>
                    </BottomBar>
                </div>
            </div>
        )
    } 
}
export default Cart