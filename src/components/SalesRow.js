const SalesRow = ({img, title, price, productSold}) => {
    return(
        <div className="animate-fadeUp flex flex-row items-center p-2 border-b overflow-auto text-sm md:text-lg md:justify-evenly">
            {/* Product Image */}
            <img src={img} alt="product" className="w-20 md:w-28 h-20 md:h-28" />

            {/* Product Title */}
            <h3 className="min-w-[40%] md:min-w-0 mx-2 text-xs md:text-base md:w-1/6 md:ml-5">{title}</h3>

            {/* product Price */}
            <h4 className="min-w-fit md:w-1/6 md:text-center">US$ {price}</h4>

            {/* Total Product Sold */}
            <h4 className="min-w-fit mx-10 md:w-1/6 md:text-center">{productSold} sold</h4>

            {/* Total Income */}
            <h4 className="min-w-fit md:w-1/6 md:text-center">US$ {price * productSold}</h4>
        </div>
    )
}
export default SalesRow