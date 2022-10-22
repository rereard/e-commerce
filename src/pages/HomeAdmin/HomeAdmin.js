import Header from "../../components/Header"
import StockUpdateRow from "../../components/StockUpdateRow"
import { useSelector } from 'react-redux'
const HomeAdmin = () => {
    const products = useSelector((state) => state.products.products)

    return(
        <div className="w-11/12 flex justify-center mt-20 flex-col text-quaternary break-words mb-20">
            <Header>
                Stock Update
            </Header>

            {/* Product Display */}
            {products.map((product) => (
                <StockUpdateRow key={product.id} id={product.id} img={product.image} title={product.title} price={product.price} stock={product.stock} />
            ))}
        </div>
    )
}
export default HomeAdmin