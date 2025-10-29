// ShopNowSection.tsx

import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
interface ShopNowSectionProps {
    backgroundImageUrl?: string;
}

const DEFAULT_BACKGROUND_IMAGE = '/images/image1.png';

export const ShopNowSection: React.FC<ShopNowSectionProps> = ({
    backgroundImageUrl
}) => {

    const imageUrl = backgroundImageUrl || DEFAULT_BACKGROUND_IMAGE;
const navigate= useNavigate()
    return (
        <div
            className="relative w-full h-96 flex items-center justify-center text-center text-white p-4"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div>

            <div className="relative z-10 max-w-xl bg-black bg-opacity-10 p-6 rounded-lg shadow-2xl">

                <h1 className="text-5xl md:text-6xl font-extrabold mb-3 uppercase tracking-widest">
                    Discover Your Style
                </h1>

                <p className="text-lg md:text-xl mb-8 italic">
                    Shop our curated collection of premium products
                </p>

                <button
                    className="px-8 py-3 bg-white text-black font-semibold text-lg uppercase rounded-full 
                hover:bg-gray-200 transition duration-300 transform hover:scale-105 shadow-lg
                focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                    onClick={()=>navigate('/shop')}
                >
                    Shop Now
                </button>
            </div>
        </div>
    );
};