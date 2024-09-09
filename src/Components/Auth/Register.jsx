import React, { useState } from 'react'
import LoginImg from "../../assets/bg-img.png";
import Logo from "../../assets/logo.svg";
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './Firebase';
import { setDoc, doc } from 'firebase/firestore';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [notification, setNotification] = useState(false)

    const handleRegister = async (e) =>{
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth,  email, password);
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    username: username,
                    email: user.email,
                    password: password
                })
            }
            setNotification({ message: "You have successfully registered!", type: "success" });
            setUsername("");
            setEmail("");
            setPassword("");
            setTimeout(() => {
                setNotification({ message: "", type: "" });
            }, 5000);


        } catch (error) {
            setNotification({ message: "Something went wrong", type: "error" });
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
                <h2 className='text-3xl font-bold mb-5'>Register</h2>
                <form onSubmit={handleRegister}>
                <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">Name</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight bg-[#F4F4FF] focus:outline-none focus:shadow-outline" 
                            id="name" 
                            type="text" 
                            placeholder="Name" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">E-mail</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight bg-[#F4F4FF] focus:outline-none focus:shadow-outline" 
                            id="email" 
                            type="email"
                            placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                            required
                        />
                    </div>
                    <button className='w-full mt-8 py-3 bg-[#EF6B4A] text-white hover:text-[#ef6b4a] hover:bg-transparent border border-[#ef6b4a]'>Register</button>
                    <Link className='w-full block border border-[#6251DD] bg-transparent text-[#6251DD] py-3 mt-5 text-center hover:bg-[#6251DD] hover:text-white' to="/login">Login</Link>
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

export default Register