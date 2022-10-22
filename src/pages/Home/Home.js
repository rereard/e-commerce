import Header from "../../components/Header"
import ProductCard from "../../components/ProductCard"
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
const Home = () => {
    const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
    const [category, setCategory] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([])

    const categories = useSelector((state) => state.products.categories)
    const products = useSelector((state) => state.products.products)

    const filterProducts = () => {
        if(categories === ""){
            setFilteredProducts([])
        }
        else{
            let filter = products.filter((product) => product.category === category)
            setFilteredProducts(filter)
        }
    }

    useEffect(() => {
        filterProducts()
    }, [category]);

    return(
        <div className="w-11/12 flex justify-center mt-20 flex-col text-quaternary mb-20">
            <Header>Our Products</Header>

            {/* Category Nav */}
            <div className="mt-2 text-end md:text-start">

                {/* Button for Expanding Category Nav When Small Screen */}
                <button className="md:hidden text-xl" onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}>
                    <i className="fa-solid fa-list-ul"></i>
                </button>

                {/* Category Nav for Large Screen */}
                <div className="hidden md:flex flex-row gap-8 text-xl">
                    {categories.map((tag, index) => (
                        <button key={index} className={`hover:underline rounded p-1 ${category === tag && "bg-tertiary "}`} onClick={() => setCategory(tag)}>
                            {tag === "" ? 'all categories' : tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category Nav for Small Screen */}
            {isCategoryExpanded && (
                <div className="animate-fadeRight flex flex-col gap-2 p-2 md:hidden rounded-sm items-end text-sm">
                    {categories.map((tag, index) => (
                        <button key={index} className={`bg-secondary p-1 rounded ${category === tag && "bg-tertiary "}`}  onClick={() => {
                            setCategory(tag)
                            setIsCategoryExpanded(!isCategoryExpanded)
                        }}>
                            {tag === "" ? 'all categories' : tag}
                        </button>
                    ))}
                </div>
            )}

            {/* Product Display */}
            <div className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                {filteredProducts.length === 0 ? 
                    products.map((product) => (
                        <ProductCard key={product.id} image={product.image} category={product.category} name={product.title} price={product.price} rating={product.rating.rate} id={product.id} productSold={product.productSold} stock={product.stock} />
                    )) : 
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} image={product.image} category={product.category} name={product.title} price={product.price} rating={product.rating.rate} id={product.id} productSold={product.productSold} stock={product.stock} />
                    ))
                }
            </div>
        </div>
    )
}
export default Home