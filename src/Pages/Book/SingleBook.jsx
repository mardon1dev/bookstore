import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import NoImg from "../../assets/no-image.jpg"

const BookDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
                const data = await response.json();
                setBook(data);
            } catch (error) {
                setError('Error fetching book details');
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    if (!book) return <p>No book found</p>;

    const { volumeInfo } = book;
    const { title, authors, description, imageLinks } = volumeInfo;

    console.log('Location state:', location.state);
    const previousPage = location.state?.fromSearch ? "/search" : "/bestseller";
    console.log(previousPage);

    return (
        <div className='container'>
            <div className='book-detail pt-[150px]'>
                <div className='w-[150px]'>
                    <Link className='text-[#090937] text-xl font-semibold flex items-center hover:text-[#EF6B4A]'
                    to={previousPage}
                    >
                        <IoIosArrowBack />
                        <span>Book Detail</span>
                    </Link>
                </div>
                <div className='flex md:flex-row flex-col items-start justify-between gap-5 py-[50px]'>
                    <div className='max-w-[420px] w-full bg-[#F4F4FF] p-[60px]'>
                        <img className='w-full' src={imageLinks ? imageLinks.thumbnail : NoImg} alt={title}  width={300} height={450}/>
                    </div>
                    <div className='max-w-[820px] w-full'>
                        <div>
                            <h2 className='md:text-[40px] text-[24px] font-semibold'>{title}</h2>
                            <p className='md:text-[32px] text-[20px] font-semibold text-[#000000]/60'>{authors ? authors.join(', ') : "No author"}</p>
                        </div>
                        <div className='mt-[60px]'>
                            <p className='md:text-[24px] text-[18px] text-[#090937] font-semibold'>Summary</p>
                            <div className='text-[18px] font-medium text-[#090937]/60'>
                                {description ? <div dangerouslySetInnerHTML={{ __html: description }} /> : "No description available"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
