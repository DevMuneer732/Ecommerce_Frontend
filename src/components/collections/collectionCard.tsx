// CollectionCard.tsx

import React from 'react';

interface CollectionCardProps {
    title: string;
    imageUrl: string;
    linkTo: string;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ title, imageUrl, linkTo }) => {
    return (
        // Card Wrapper: Shadow, rounded, and hover effect
        <a
            href={linkTo}
            className="group relative h-72 overflow-hidden rounded-xl shadow-lg cursor-pointer
                 transition duration-300 ease-in-out hover:shadow-2xl 
                 hover:scale-[1.02] transform"
        >
            {/* Background Image Container with Zoom Effect */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>

            {/* Title Bar: Dark, bottom overlay matching your design */}
            <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 w-full">
                <h3 className="text-xl font-semibold text-white tracking-wide">
                    {title}
                </h3>
            </div>
        </a>
    );
};