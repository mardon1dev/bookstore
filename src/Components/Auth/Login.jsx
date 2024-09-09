import React, { useState } from 'react'
import LoginImg from "../../assets/bg-img.png";
import Logo from "../../assets/logo.svg";
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [notification, setNotification] = useState(false)


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setNotification({ message: "Welcome back!", type: "success" });
            setEmail("");
            setPassword("");
            setTimeout(() => {
                setNotification({ message: "", type: "" });
            }, 5000);
            setTimeout(()=>{
                window.location.href ="/profile"
            }, 1000)

        } catch (error) {
            setNotification({ message: error.message, type: "error" });
            setTimeout(() => {
                setNotification({ message: "", type: "" });
            }, 5000);
            
        }
    }
  return (
    <div className='w-full flex items-center justify-center h-screen overflow-hidden'>
        <div className='md:w-[50%] md:block w-full md:relative absolute md:z-0 -z-10'>
            <img className='w-full h-screen object-cover' src={LoginImg} alt="Login" />
        </div>
        <div className='md:w-[50%] w-[90%] mx-auto h-screen overflow-hidden flex justify-center items-center md:relative absolute md:z-0 z-1'>
            <div className='bg-white md:p-10 p-5 rounded-md max-w-[400px] w-full flex flex-col items-center'>
                <img className='mb-5' src={Logo} alt="Logo" />
                <h2 className='text-3xl font-bold mb-5'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">E-mail</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight bg-[#F4F4FF] focus:outline-none focus:shadow-outline" 
                            id="email" 
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">Password</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight bg-[#F4F4FF] focus:outline-none focus:shadow-outline" 
                            id="password" 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className='w-full mt-8 py-3 bg-[#EF6B4A] text-white hover:text-[#ef6b4a] hover:bg-transparent border border-[#ef6b4a]'>Login</button>
                    <Link className='w-full block border border-[#6251DD] bg-transparent text-[#6251DD] py-3 mt-5 text-center hover:bg-[#6251DD] hover:text-white' to="/register" >Register</Link>
                </form>
            </div>
        </div>
        {notification.message && (
            <div className={`fixed top-5 right-5 mx-auto bg-white p-4 rounded-md max-w-[400px] text-center border ${notification.type === "success" ? "text-green-600 border-green-600" : "text-red-600 border-red-600"}`}>
                {notification.message}
            </div>
        )}
    </div>
  )
}

export default Login