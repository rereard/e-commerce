import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addCart, minCart } from "../../features/cartSlice"
import { useState, useEffect } from "react"

const ProductDetail = () => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    const isLogin = useSelector((state) => state.login.isLogin)
    const cartItem = useSelector((state) => state.cart.items).find((item) => item.id === Number(params.id))
    const allProducts = useSelector((state) => state.products.products)
    
    const [cartItemTotal, setCartItemTotal] = useState(cartItem?.total ? cartItem?.total : 0)
    const [product, setProduct] = useState({})

    useEffect(() => {
        setProduct(allProducts.find(item => item.id === Number(params.id) ))
    }, [allProducts]);

    return(
        <div className="w-11/12 flex mt-20 items-center flex-col md:flex-row md:p-8 text-quaternary break-words justify-center mb-5 md:mb-0">

            {/* Product Image */}
            <div className="w-2/3 md:w-auto max-w-sm md:mr-6">
                <img src={product?.image} alt="product" />
            </div>

            {/* Product Detail */}
            <div className="w-11/12 mt-2 md:h-full md:w-96 md:p-5">

                {/* Product Category */}
                <span className="text-sm">{product?.category}</span>

                {/* Product Price */}
                <h2 className="text-2xl md:mt-5 md:mb-2">US$ {product?.price}</h2>

                {/* Product Title */}
                <h1 className="text-xl md:text-2xl font-bold">{product?.title}</h1>

                {/* Product Rating & Sold */}
                <p className="mb-2 text-sm"><i className="fa-solid fa-star"></i> {product?.rating?.rate} | {product?.productSold} sold</p>

                {/* Product Description */}
                <p className="md:w-96">{product?.description}</p>

                {/* Add to Cart Button */}
                {cartItemTotal > 0 && isLogin ? (

                    // If Item in Cart
                    <div className="flex justify-evenly mt-2 md:mt-5">

                        {/* Min Button */}
                        <button className="bg-tertiary rounded-lg py-2 px-6 text-sm" onClick={() => {
                            setCartItemTotal(cartItemTotal-1)
                            dispatch(minCart({id: Number(params.id), total: cartItemTotal}))
                        }}>
                            <i className="fa-solid fa-minus"></i>
                        </button>

                        {/* Total Item in Cart */}
                        <span className="text-sm self-center text-center">{cartItemTotal}</span>

                        {/* Add Button */}
                        <button className={`${cartItemTotal === product.stock && 'invisible'} bg-tertiary rounded-lg py-2 px-6 text-sm`} onClick={() => {
                            setCartItemTotal(cartItemTotal+1)
                            dispatch(addCart({id: Number(params.id), total: cartItemTotal}))
                        }}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                ) : (

                    // If no Item in Cart
                    <button disabled={product.stock === 0 ? true : false} className="mt-2 bg-tertiary rounded-lg p-2 text-sm w-full md:mt-5 disabled:bg-tertiary/25" onClick={() => {
                        if(!localStorage.getItem("token")){
                            navigate("/login")
                        } else{
                            setCartItemTotal(cartItemTotal+1)
                            dispatch(addCart({id: Number(params.id), total: cartItemTotal+1}))
                        }
                    }}>
                        {product.stock === 0 ? 'Sold Out' : (<i className="fa-solid fa-cart-arrow-down"></i>)}
                    </button>
                )}

            </div>
        </div>
    )
}
export default ProductDetail