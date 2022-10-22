import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addCart, minCart } from "../features/cartSlice"
import { useState } from "react"

const ProductCard = ({category, image, name, price, rating, id, productSold, stock}) => {
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const isLogin = useSelector((state) => state.login.isLogin)
    const cartItem = useSelector((state) => state.cart.items).find((item) => item.id === id)

    const [cartItemTotal, setCartItemTotal] = useState(cartItem ? cartItem?.total : 0)

    return(
        <div className="animate-fadeUp bg-secondary border-quaternary border-2 rounded-lg mb-3 md:mb-0 break-words flex flex-col">

            {/* Product Image */}
            <img src={image} alt="Product" className="rounded-lg h-32 sm:h-40 md:h-60 w-full" />

            {/* Product Detail */}
            <div className="px-2 mb-2">
                {/* Product Category */}
                <p className="mt-2 text-xs sm:text-sm md:text-base">{category}</p>

                {/* Product Price */}
                <h2 className="sm:text-xl md:text-2xl font-semibold my-2">US$ {price}</h2>

                {/* Product Title */}
                <Link to={`/product/${id}`}>
                    <h1 className="sm:text-lg md:text-xl font-semibold mb-2 hover:underline">{name}</h1>
                </Link>

                {/* Product Rating & Sold */}
                <p className="text-xs sm:text-sm md:text-base"><i className="fa-solid fa-star"></i> {rating} | {productSold} sold</p>
            </div>

            {/* Add to Cart Button */}
            {cartItemTotal > 0 && isLogin ? (

                // If Item in Cart and Logged in as User
                <div className="h-full flex items-end p-2">
                    <div className="w-full flex items-center justify-between">

                        {/* Min Button */}
                        <button className="bg-tertiary rounded-lg p-2 md:p-4 text-sm md:text-base" onClick={() => {
                            setCartItemTotal(cartItemTotal-1)
                            dispatch(minCart({id: id, total: cartItemTotal}))
                        }}>
                            <i className="fa-solid fa-minus"></i>
                        </button>

                        {/* Total Item in Cart */}
                        <span className="text-sm md:text-lg grow text-center">{cartItemTotal}</span>

                        {/* Add Button */}
                        <button className={`${cartItemTotal === stock && 'invisible'} bg-tertiary rounded-lg p-2 md:p-4 text-sm md:text-base`} onClick={() => {
                            setCartItemTotal(cartItemTotal+1)
                            dispatch(addCart({id: id, total: cartItemTotal}))
                        }}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>  
            ) : (

                // If no Item in Cart or not Logged in
                <div className="h-full flex items-end p-2">

                    {/* Button for Adding Item to Cart */}
                    <button disabled={stock === 0 ? true : false} className="w-full bg-tertiary rounded-lg p-2 md:p-4 text-sm md:text-xl disabled:bg-tertiary/25" onClick={() => {
                        if(!localStorage.getItem("token")){
                            navigate("/login")
                        } else{
                            setCartItemTotal(cartItemTotal+1)
                            dispatch(addCart({id: id, total: cartItemTotal+1}))
                        }
                    }}>
                        {stock === 0 ? 'Sold Out' : (<i className="fa-solid fa-cart-arrow-down"></i>)}
                    </button>
                </div>
            )}

        </div>
    )
}
export default ProductCard