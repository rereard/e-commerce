import { useDispatch } from "react-redux"
import { addCart, minCart, changeIsChecked, deleteItem } from "../features/cartSlice"
import { useState } from "react"
const CartRow = ({id, image, title, price, stock, isChecked, totalItem}) => {
    const dispatch = useDispatch()
    
    const [cartItemTotal, setCartItemTotal] = useState(totalItem)
    const [checked, setChecked] = useState(isChecked)

    return(
        <div className="animate-fadeUp flex flex-row items-center p-2 border-b overflow-x-auto text-sm md:text-lg">

            {/* CheckBox */}
            <input type="checkbox" className="w-auto scale-150 md:scale-200 mr-4 md:w-1/6" checked={checked} onChange={() => {
                setChecked(!checked)
                dispatch(changeIsChecked(id))
            }} />

            {/* Product Image */}
            <img src={image} alt="product" className=" w-20 md:w-28 h-20 md:h-28" />

            {/* Product Title */}
            <h3 className=" min-w-[40%] md:min-w-0 mx-2 text-xs md:text-base md:w-48 md:ml-5">{title}</h3>

            {/* Product Price */}
            <h4 className=" min-w-fit md:w-1/6 md:text-center">US$ {price}</h4>

            {/* Total Item */}
            <div className="flex flex-row mx-3">

                {/* Min Button */}
                <button className={`${cartItemTotal === 1 && 'invisible'} bg-secondary rounded-xl p-1 md:p-2 text-xs`} onClick={() => {
                    setCartItemTotal(cartItemTotal-1)
                    dispatch(minCart({id: id, total: cartItemTotal}))
                }}>
                    <i className="fa-solid fa-minus"></i>
                </button>

                {/* Total Item in Cart */}
                <span className="w-8 text-center mx-2">{cartItemTotal}</span>

                {/* Add Button */}
                <button className={`${cartItemTotal === stock && 'invisible'} bg-secondary rounded-xl p-1 md:p-2 text-xs`} onClick={() => {
                    setCartItemTotal(cartItemTotal+1)
                    dispatch(addCart({id: id, total: cartItemTotal}))
                }}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>

            {/* Total Price Item */}
            <h4 className="min-w-fit md:w-1/6 md:text-center">US$ {Number(price)*Number(totalItem)}</h4>

            {/* Delete Item Button */}
            <button className="w-auto mx-5 md:mx-0 hover:text-tertiary" onClick={() => dispatch(deleteItem(id))}>
                <i className="fa-solid fa-trash"></i>
            </button>
        </div>
    )
}
export default CartRow