import React, { useEffect, useState } from 'react'
import Logo from "../../assets/logo.svg";
import { LuUser2 } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Auth/Firebase';


const Header = () => {
    const [search, setSearch] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate(); 

    const [user, serUser] = useState();
    useEffect(()=>{
        auth.onAuthStateChanged((user) => {
            if (user) {
                serUser(user);
            }
        })
    })
    
    const handleSearch = () =>{
        setSearch(!search);
        if(searchValue !== ""){
            localStorage.setItem("query", JSON.stringify(searchValue))
        }
    }
    const handleSearchValue = (e) => {
        e.preventDefault();
        if(searchValue.length == ""){
            alert("Please enter something to search");
        }
        if (searchValue.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchValue.trim())}`);
            setSearchValue("");
            setSearch(false)
        }
    };

  return (
    <header className='py-[35px] w-full fixed top-0 left-0 bg-white z-50'>
        <div className="container">
        <nav className="nav flex items-center justify-between md:gap-10 gap-6">
            <div className="nav__logo">
                <Link to="/"><img src={Logo} alt="Logo" width={60} height={40}/></Link>
            </div>
            <form onSubmit={handleSearchValue} className={`search-form md:items-center md:justify-center w-full gap-4 md:flex ${search ? 'absolute p-4 top-[100px] left-0 flex py-[20px] flex-col items-end bg-white' : 'hidden'}`}>
                <label htmlFor="search" className='max-w-[800px] w-full relative'>
                    <CiSearch className='text-white absolute top-0 bottom-0 my-auto left-[20px]' size={20} />
                    <input value={searchValue} onChange={e=>setSearchValue(e.target.value)} className={`search-input w-full inline-block text-black outline-none px-[50px] py-[10px] rounded-lg placeholder:text-white`} type="text" name='search' id='search' placeholder="Search"/>
                </label>
                <button className='w-[100px] search-button px-[10px] py-[10px] rounded-lg text-black font-semibold' type='submit'>Submit</button>
            </form>
            <div className="nav__user flex items-center gap-4 ">
                <button onClick={handleSearch} className="nav__user-btn md:w-[50px] w-[30px] md:h-[50px] h-[30px] rounded-lg flex items-center justify-center md:hidden">
                <CiSearch className='text-black' size={20} />
                </button>
                <Link className="md:w-[50px] w-[30px] md:h-[50px] h-[30px] rounded-lg flex items-center justify-center" to={
                    user ? `/profile` : `/login`
                }>
                    <LuUser2 size={24} />
                </Link>
                {/* <a className="md:w-[50px] w-[30px] md:h-[50px] h-[30px] rounded-lg flex items-center justify-center">
                    <FaRegHeart size={24} />
                </a>
                <a className="md:w-[50px] w-[30px] md:h-[50px] h-[30px] rounded-lg flex items-center justify-center">
                    <LuShoppingCart size={24} />
                </a> */}
            </div>
        </nav>
        </div>
    </header>
  )
}

export default Header