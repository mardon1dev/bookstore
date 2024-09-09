import React, { useState, useEffect, useContext } from 'react'
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import { GlobalStateContext } from '../Context/Context';
const BestSeller = () => {
    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; 
    // const API_KEY = ""
    console.log(API_KEY);
    const searchTerm = 'best sellers 2024'; 

    const { addToLiked, addToCart } = useContext(GlobalStateContext); 

    const [allBooks, setAllBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchBooks = () => {
            setLoading(true);
            setError(null);

            fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&key=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.items) {
                    setAllBooks(data.items);
                } else {
                    setError('No books found');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Error fetching books');
                setLoading(false);
            });
        };

        fetchBooks();
    }, [searchTerm]);

    return (
    <section>
        <div className="container">
            <div className="bestseller py-[100px]">
                <div className='flex items-center justify-between'>
                    <h2 className='text-[#090937] text-3xl font-semibold'>Best Sellers</h2>
                    <Link className='text-[#EF6B4A] font-bold text-[20px]' to="/bestseller">View All</Link>
                </div>
                <div className={`grid ${loading ? `grid-cols-1`: `lg:grid-cols-4 sm:grid-cols-2`} gap-4 mt-8 justify-center`}>
                    {loading && 
                        <div className="w-full flex items-center justify-center">
                            <div className="loader"></div>
                        </div>}
                    {error && <p>{error}</p>}
                    {!loading && !error && allBooks.slice(0,4).map((book, index) => (
                        <Card 
                        key={index} 
                        book={book} 
                        addToLiked={addToLiked} 
                        addToCart={addToCart}    
                        source="bestseller"
                    />
                    ))} 
                </div>
            </div>
        </div>
    </section>
    )
}

export default BestSeller;