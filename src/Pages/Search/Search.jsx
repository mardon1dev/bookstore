import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Card from '../../Components/Card/Card';
import { IoIosArrowBack } from "react-icons/io";
import { GlobalStateContext } from '../../Components/Context/Context';


const SearchBooks = () => {
    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; 
    const location = useLocation();
    const { addToLiked, addToCart} = useContext(GlobalStateContext)
    const query = new URLSearchParams(location.search).get('query') || JSON.parse(localStorage.getItem("query")); 
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    localStorage.setItem("query", JSON.stringify(query))

    useEffect(() => {
        if (query) {
            const fetchBooks = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=${API_KEY}`);
                    const data = await response.json();
                    setBooks(data.items || []);
                } catch (err) {
                    setError('Failed to fetch books');
                } finally {
                    setLoading(false);
                }
            };
            
            fetchBooks();
        }
        }, [query]);
    
    return (
        <div className='search-books'>
            <div className="container">
                <div className='py-[150px]'>
                    <Link className='text-[20px] font-semibold flex items-center w-[60px] hover:text-[#EF6B4A]' to="/">
                        <IoIosArrowBack className=''/>
                        <span className="">Back</span>
                    </Link>
                    <h2 className='text-[#090937] text-3xl font-semibold mt-5'>Results:</h2>
                    {loading && <div className="loader"></div>}
                    {error && <p>{error}</p>}
                    <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-4 mt-4'>
                    {books.map((book, index) => (
                        <Card 
                            key={index} 
                            book={book} 
                            source="search" 
                            query={query} 
                            addToLiked={addToLiked}
                            addToCart={addToCart}
                        />
                    ))}
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default SearchBooks;
