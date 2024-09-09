import React, { useContext, useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../Components/Auth/Firebase';
import { ref, uploadBytes, getDownloadURL  } from 'firebase/storage';
import { v4 } from 'uuid';
import Avatar from "../../assets/avatar.avif"
import { Link } from 'react-router-dom';
import { GlobalStateContext } from '../../Components/Context/Context';
import { IoMdArrowRoundBack } from "react-icons/io";

const Profile = () => {

  const { likedList, cartList} = useContext(GlobalStateContext)
  const [profile, setProfile] = useState(null);
  const [about, setAbout] = useState(false);
  const [aboutText, setAboutText] = useState("");

  const handleProfile = () =>{
    auth.onAuthStateChanged(async(user)=>{
      if(user){
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
          setAboutText(docSnap.data().about || "")
        }
      }
    })
  }
  const [selectedImage, setSelectedImage] = useState(null)
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a reference for the image in Firebase storage
      const imgRef = ref(storage, `files/${v4()}`);

      // Upload the image file to Firebase storage
      await uploadBytes(imgRef, file)
        .then( async() => {
          const downloadURL = await getDownloadURL(imgRef);
          setSelectedImage(downloadURL);

          const user = auth.currentUser;
          const docRef = doc(db, "users", user.uid);
          await updateDoc(docRef, { photoURL: downloadURL });
          // Optionally, retrieve the download URL if you want to use it
          // You can update Firebase profile photoURL with this URL later
        })
        .catch((error) => {
        });

      // Display the image preview
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  useEffect(()=>{
    handleProfile();
  }, [])

  useEffect(() => {
    if (profile?.photoURL) {
      setSelectedImage(profile.photoURL);
    }
  }, [profile]);

  const handleAbout = () =>{
    setAbout(!about);
  }

  const handleSaveAbout = async () => {
    const user = auth.currentUser; // Get the authenticated user
    if (user) {
      const docRef = doc(db, "users", user.uid); // Use user's UID from auth
      await updateDoc(docRef, { about: aboutText }); // Save About Me text to Firestore
      setAbout(false); // Exit edit mode after saving
    } else {
      console.error("No user is authenticated.");
    }
  };

  const handleAboutChange = (e) => {
    setAboutText(e.target.value); // Update About Me input value
  };

  const handleLogOut = async () =>{
    try {
      await auth.signOut();
      window.location.href ="/login"
    } catch (error) {
      // console.log(error);
    }
  }

  return (
    <div>
      <div className="container">
        <div className={`profile py-[50px] min-h-screen h-full ${!profile ? `flex items-center justify-center`: ``} w-full`}>
          {
          profile ? (
            <div className="grid grid-cols-12 md:grid-rows-5 gap-4">
              <div className="col-span-12 row-span-1 flex justify-between items-center py-3">
                <h2 className='text-2xl font-semibold'>Profile</h2>
                <div className='flex items-center gap-2'>
                  <Link className="font-semibold hover:underline flex items-center gap-1" to="/">
                    <IoMdArrowRoundBack />
                    <span>
                      Back to Main
                    </span>
                  </Link>
                  <button onClick={handleLogOut} className='font-bold rounded text-red-600'>Logout</button>
                </div>
              </div>
              <div className=" lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 md:row-span-4 bg-gray-300 p-4 rounded-md flex flex-col sm:justify-center items-center sm:items-start sm:text-left text-center">
                <div>
                  <label htmlFor="profile-image">
                    <input 
                      type="file" 
                      className='hidden' 
                      id='profile-image'
                      onChange={handleImageChange}
                    />
                    <img 
                      src={selectedImage || Avatar}
                      alt="profile" 
                      className="rounded-full h-[200px] w-[200px] object-cover" 
                      width={200} 
                      height={200}
                    />
                  </label>
                </div>
                <div className='mt-4'>
                  <h3 className='text-lg'>Name: <span className='font-bold'>{profile.username}</span></h3>
                  <h3 className='text-lg'>Email: <span className='font-bold text-sm'>{profile.email}</span></h3>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-5 md:row-span-4 bg-gray-300 p-4 rounded-md min-h-[200px] h-full">
                <div className='flex justify-between'>
                  <h2 className='text-lg font-bold'>About Me</h2>
                  <button onClick={handleAbout} className='bg-transparent shadow-md py-2 px-3'>
                    {about ? "Cancel" : "Edit"}
                  </button>
                </div>
                {about ? (
                  <div className='flex flex-col items-end'>
                    <textarea
                      className='border-none resize-none outline-none p-2 bg-transparent shadow-md mt-5 w-full h-[150px] text-black caret-black'
                      value={aboutText}
                      onChange={handleAboutChange}
                    ></textarea>
                    <button
                      className='bg-transparent shadow-md py-2 px-3 mt-4'
                      onClick={handleSaveAbout}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <p className='text-sm'>{aboutText || "No info."}</p>
                )}
              </div>
              <div className="col-span-12 md:col-span-12 lg:col-span-3 md:row-span-4 bg-gray-300 p-4 rounded-md  min-h-[200px] h-full flex flex-col justify-between">
                <div>
                  <h2 className='text-lg font-bold'>Liked Books</h2>
                  {
                    likedList.length > 0 ? (
                      <ul>
                      {
                        likedList.map((book, index) => {
                          const {volumeInfo} = book;
                          const {title } = volumeInfo;
                          return (
                          <li key={index} className="py-2">
                            
                            <Link to={`/book/${book.id}`} className="text-sm hover:underline">{title}</Link>
                          </li>
                          )
                        })
                      }
                    </ul>
                    ) : (
                      <p>No books liked yet</p>
                    )
                  }
                </div>
                <div className='flex items-start flex-col h-[50%]'>
                  <h2 className='text-lg font-bold'>Cart Books</h2>
                  {
                    cartList.length > 0 ? (
                      <ul>
                        {
                          cartList.map((book, index) => {
                            const {volumeInfo} = book;
                            const {title } = volumeInfo;
                            return (
                              <li key={index} className="py-2">
                                <Link to={`/book/${book.id}`} className="text-sm hover:underline">{title}</Link>
                              </li>
                            )
                          })
                        }
                      </ul>
                    ) : (
                      <p>No books in cart</p>
                    )
                  }
                </div>
              </div>
              <div className="col-span-12 bg-gray-800 p-4 rounded-md flex items-center justify-end">
              </div>
            </div>
          )
          : (
            <div className="loader"></div>
          )
          }
        </div>
      </div>
    </div>
  )
}

export default Profile