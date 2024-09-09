import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section className="pt-[120px]">
            <div className='container'>
                <div className="hero rounded-lg">
                    <h1 className='hidden'>Hero</h1>
                    <div className='max-w-[400px] py-[68px] md:px-[60px] px-[20px]'>
                        <p className='md:text-4xl text-2xl text-white'><strong className='text-[#F0B861]'>25% discount</strong> all Paulo Coelho books!</p>
                        <Link to={{
                            pathname: '/search',
                            search: "?query=Paulo+Coelho",
                        }} className='inline-block mt-5 bg-[#F0B861] text-white py-2 px-[20px] rounded-[10px] hover:bg-[#F0B861]/80'>Explore Now</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero