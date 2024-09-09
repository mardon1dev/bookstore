import React, { createContext, useState, useEffect } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {

    const [liked, setLiked] = useState(false);
    const [likedCount, setLikedCount] = useState(0);

    const [saved, setSaved] = useState(false);
    const [savedCount, setSavedCount] = useState(0);

    const [cartList, setCartList] = useState(() => {
        const savedCartList = localStorage.getItem('cartList');
        return savedCartList ? JSON.parse(savedCartList) : [];
    });

    const [likedList, setLikedList] = useState(() => {
        const savedLikedList = localStorage.getItem('likedList');
        return savedLikedList ? JSON.parse(savedLikedList) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartList', JSON.stringify(cartList));
    }, [cartList]);

    useEffect(() => {
        localStorage.setItem('likedList', JSON.stringify(likedList));
    }, [likedList]);

    const addToLiked = (book) => {
        setLiked(!liked);
        setLikedList(prevLikedList => {
            // Toggle the book in the liked list
            if (prevLikedList.some(likedBook => likedBook.id === book.id)) {
                return prevLikedList.filter(likedBook => likedBook.id !== book.id); // Remove if already liked
            }
            return [...prevLikedList, book]; // Add if not liked
        });
    };

    const addToCart = (book) => {
        setSaved(!saved)
        setCartList(prevCartList => {
            // Toggle the book in the cart list
            if (prevCartList.some(cartBook => cartBook.id === book.id)) {
                return prevCartList.filter(cartBook => cartBook.id !== book.id); // Remove if already in cart
            }
            return [...prevCartList, book]; // Add if not in cart
        });
    };

    return (
        <GlobalStateContext.Provider value={{ cartList, likedList, addToLiked, addToCart, liked, setLiked, saved, setSaved }}>
            {children}
        </GlobalStateContext.Provider>
    );
};
