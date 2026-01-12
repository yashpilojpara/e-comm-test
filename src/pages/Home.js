import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";

import "../styles/product.css";

const Home = () => {
    const dispatch = useDispatch();

    const { list, loading, categories } = useSelector(
        (state) => state.products
    );

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 12;

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

   
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

   
    const filteredProducts =
        selectedCategory === "all"
            ? list
            : list.filter(
                (product) => product.category === selectedCategory
            );

    const totalPages = Math.ceil(
        filteredProducts.length / itemsPerPage
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    if (loading) {
        return <h3 className="loading">Loading products...</h3>;
    }

    return (
        <>
            <div className="container">
            
                <div className="category-bar">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={
                                selectedCategory === category ? "active" : ""
                            }
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category.replace(/-/g, " ")}
                        </button>
                    ))}
                </div>

                <div className="product-container">
                    {paginatedProducts.map((product) => (
                        <div className="product-card" key={product.id}>
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                            />
                            <h4>{product.title}</h4>
                            <p className="price">₹ {product.price}</p>
                            <button
                                onClick={() => dispatch(addToCart(product))}
                            >
                                Add to Cart
                            </button>

                        </div>
                    ))}
                </div>

          
                {totalPages > 1 && (
                    <div className="pagination">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={
                                    currentPage === index + 1 ? "active" : ""
                                }
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
