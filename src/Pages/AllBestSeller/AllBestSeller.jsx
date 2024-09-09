import React, { useState, useEffect, useContext } from 'react'
import Card from '../../Components/Card/Card';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { GlobalStateContext } from '../../Components/Context/Context';
const AllBestSeller = () => {
    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; 
    const searchTerm = 'best sellers 2024';

    const { addToLiked, addToCart } = useContext(GlobalStateContext); 
    const [allBooks, setAllBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [viewMore, setViewMore] = useState(false)

    const handleMore = ()=>{
        setViewMore(!viewMore)
    }
    
    useEffect(() => {
        const fetchBooks = () => {
            setLoading(true);
            setError(null);

            fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&maxResults=40&key=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
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
    <section className='py-[50px]'>
        <div className="container">
            <div className="bestseller pt-[150px] flex flex-col items-center">
                <div className='flex items-center justify-start w-full'>
                    <Link className='text-[#090937] text-2xl font-semibold flex items-center hover:text-[#EF6B4A]' to="/">
                        <IoIosArrowBack />
                        <span>Best Sellers</span>
                    </Link>
                </div>
                <div className={`grid ${loading ? `grid-cols-1`: `lg:grid-cols-4 sm:grid-cols-2`} gap-4 mt-8 justify-center`}>
                    {loading && 
                        <div className='w-full flex items-center justify-center'>
                            <div className="loader"></div>
                        </div>}
                    {error && <p>{error}</p>}
                    {!loading && !error && (
                        viewMore ? (
                            allBooks.map((book, index) => (
                                <Card 
                                    key={index} 
                                    book={book} 
                                    addToLiked={addToLiked} 
                                    addToCart={addToCart} 
                                    source="bestseller"
                                />
                            ))
                        ) : (
                            allBooks.slice(0, 8).map((book, index) => (
                                <Card 
                                    key={index} 
                                    book={book} 
                                    addToLiked={addToLiked} 
                                    addToCart={addToCart} 
                                    source="bestseller"
                                />
                            ))
                        )
                    )}
                </div>
                <button onClick={handleMore} className='text-[#EF6B4A] mx-auto font-bold text-[20px] mt-5 border border-[#ef6b4a] py-3 px-4 hover:bg-[#ef6b4a] hover:text-white' href="#">{
                    viewMore ? 'View Less' : 'View More'
                }</button>
            </div>
        </div>
    </section>
    )
}

export default AllBestSeller