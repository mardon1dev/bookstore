import React, { useContext, useState } from 'react'
import noIMage from "../../assets/no-image.jpg";
import { FaRegHeart, FaHeart, FaShoppingCart  } from "react-icons/fa";
import { LuShoppingCart  } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../Context/Context';

const Card = ({book, index, source, query}) => {
    const {volumeInfo} = book;
    const {title, authors, imageLinks, accessInfo } = volumeInfo;
    const { addToLiked, addToCart, likedList, cartList } = useContext(GlobalStateContext);


    const navigate = useNavigate();
    const handleMoreInfo = () => {
        navigate(`/book/${book.id}`, { 
            state: { 
                fromPage: source || location.pathname,
                fromSearch: source === 'search',
                query
            } 
        });
    };

    const pdfLink = accessInfo?.pdf?.downloadLink || null;

    const liked = likedList.some(likedBook => likedBook.id === book.id);
    const saved = cartList.some(cartBook => cartBook.id === book.id);


  return (
    <div className='card bg-[#F4F4FF] flex flex-col items-center justify-between p-[10px] border border-[#090937]/10 rounded gap-5 hover:bg-[#f4f4f4] duration-200' key={index}>
        <img className='h-auto' src={imageLinks ? imageLinks.thumbnail : noIMage} alt={title} width={120} height={180} />
        <div className='flex flex-col items-center'>
            <div className='text-center'>
                <h2 className='text-[#090937] text-[20px] font-semibold line-clamp-1'>{title}</h2>
                <p className='text-[#090937]/60 text-[16px] font-semibold line-clamp-1'>{authors ? authors : "No author"}</p>
            </div>
            <button 
                onClick={handleMoreInfo}
                className='border border-[#6251DD] text-[#6151dd] py-2 px-3 mt-2 hover:bg-[#6251dd] hover:text-white'
            >
                More info
            </button>
        </div>
        <div className='flex gap-3'>
                {pdfLink ? (
                    <button
                        onClick={() => setShowPdf(!showPdf)}
                        className='text-[#6251DD]'
                    >
                        {showPdf ? 'Hide PDF' : 'View PDF'}
                    </button>
                ) : (
                    <p>No PDF available</p>
                )}
            <button onClick={()=>addToLiked(book)}>
                {liked ? (
                    <FaHeart className="text-red-500" size={24} /> // Filled heart icon
                ) : (
                    <FaRegHeart className="text-[#6251DD]" size={24} /> // Empty heart icon
                )}
            </button>
            <button onClick={()=>addToCart(book)}>
                {saved ? (
                    <FaShoppingCart className="text-green-500" size={24} /> // Filled cart icon
                ) : (
                    <LuShoppingCart className="text-[#6251DD]" size={24} /> // Empty cart icon
                )}
            </button>
        </div>
    </div>
  )
}

export default Card