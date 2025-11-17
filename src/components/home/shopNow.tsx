// ShopNowSection.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CAROUSEL_IMAGES = [
    '/images/shop1.jpg',
    '/images/shop2.jpg',
    '/images/shop3.jpg',
    '/images/shop4.jpg'
]
export const ShopNowSection: React.FC = ({

}) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === CAROUSEL_IMAGES.length - 1 ? 0 : prevIndex + 1
            );
        }, 8000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center text-center text-white overflow-hidden">

            {CAROUSEL_IMAGES.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            ))}

            {/* Dark Overlay (Keeps text readable) */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            {/* 4. Content (Z-Index 20 ensures it sits on top of images and overlay) */}
            <div className="relative z-20 max-w-xl  p-8">

                <h1 className="text-5xl md:text-6xl font-extrabold mb-3 uppercase tracking-widest drop-shadow-lg">
                    Discover Your Style
                </h1>

                <p className="text-lg md:text-xl mb-8 italic drop-shadow-md">
                    Shop our curated collection of premium products
                </p>

                <button
                    className="px-8 py-3 bg-white text-black font-semibold text-lg uppercase rounded-full 
                    hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg
                    focus:outline-none focus:ring-4 focus:ring-white/50"
                    onClick={() => navigate('/shop')}
                >
                    Shop Now
                </button>

                {/* Optional: Dots Indicator at bottom */}
                {/* <div className="flex justify-center space-x-2 mt-6">
                    {CAROUSEL_IMAGES.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div> */}
            </div>
        </div>
    );
};