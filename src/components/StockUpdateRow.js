import { useState } from "react"
import { addStockBy1, minStockBy1, changeStock } from "../features/ProductSlice"
import { useDispatch } from "react-redux"
const StockUpdateRow = ({id, img, title, price, stock}) => {
    const dispatch = useDispatch()

    const [productStock, setProductStock] = useState(stock)

    return(
        <div className="animate-fadeUp flex flex-row items-center p-2 border-b overflow-auto text-sm md:text-lg md:justify-evenly">

            {/* Product Image */}
            <img src={img} alt="product" className="w-20 md:w-28 h-20 md:h-28" />

            {/* Product Title */}
            <h3 className="min-w-[40%] md:min-w-0 mx-2 text-xs md:text-base md:w-1/6">{title}</h3>

            {/* Product Price */}
            <h4 className="min-w-fit md:w-1/6 md:text-center">US$ {price}</h4>

            {/* Change Product Stock */}
            <div className="flex flex-row mx-3 md:mx-0 md:w-1/6 md:justify-center">

                {/* Min Button */}
                <button className={`${productStock === 0 || productStock === "" ? 'invisible' : 'visible'} bg-secondary rounded-xl p-1 md:p-2 text-xs`} onClick={() => {
                    setProductStock(productStock-1)
                    dispatch(minStockBy1(id))
                }}>
                    <i className="fa-solid fa-minus"></i>
                </button>

                {/* Input Stock Value */}
                <input 
                    placeholder="0"
                    value={productStock} 
                    type="number" 
                    min={0} 
                    className="bg-primary border-b w-8 text-center mx-2 appearance-none" 
                    onChange={(event) => {
                        if(Number(event.target.value) < 0){
                            setProductStock(0)
                            dispatch(changeStock({id: id, stock: 0}))
                        } else{
                            setProductStock(event.target.value === "" ? "" : Number(event.target.value))
                            dispatch(changeStock({id: id, stock: Number(event.target.value)}))
                        }
                    }} 
                    onKeyDown={(e) => ['-', '+', 'e', 'E'].includes(e.key) && e.preventDefault()}
                    onInput={(event) => event.target.value = event.target.value.replace(/[e\+\-\E]/ig, "")}
                />

                {/* Add Button */}
                <button className="bg-secondary rounded-xl p-1 md:p-2 text-xs" onClick={() => {
                    setProductStock(productStock+1)
                    dispatch(addStockBy1(id))
                }}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>
    )
}
export default StockUpdateRow