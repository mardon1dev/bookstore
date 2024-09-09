import React from 'react';
import Header from './Components/Header/Header';
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import Home from './Pages/Home/Home';
import AllBestSeller from './Pages/AllBestSeller/AllBestSeller';
import BookDetail from './Pages/Book/SingleBook';
import SearchBooks from './Pages/Search/Search';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Profile from './Pages/Profile/Profile';
import { GlobalStateProvider } from './Components/Context/Context';


const App = () => {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <ConditionalHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="bestseller" element={<AllBestSeller />} />
          <Route path="book/:id" element={<BookDetail />} />
          <Route path="search" element={<SearchBooks />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path='profile' element={<Profile />}/>
        </Routes>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}

const ConditionalHeader = () => {
  const location = useLocation();
  return location.pathname !== '/login' && location.pathname !== "/register" && location.pathname !== "/profile" ? <Header /> : null;
}

export default App;
