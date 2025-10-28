import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { Heart } from 'lucide-react';

interface ProductCardProps {
    productId: number;
    imageUrl: string;
    title: string;
    price: number;
    comparePrice?: number;
    rating: number;
    reviewCount?: number;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const roundedRating = Math.round(rating);
    const stars = Array.from({ length: 5 }, (_, index) => (
        <StarIcon
            key={index}
            className={`h-4 w-4 ${index < roundedRating ? 'text-yellow' : 'text-gray-300'}`}
            aria-hidden="true"
        />
    ));
    return <div className="flex items-center">{stars}</div>;
};


// 2. The Main ProductCard Component
export const ProductCard: React.FC<ProductCardProps> = ({
    imageUrl,
    title,
    price,
    comparePrice,
    rating,
    reviewCount = 0,
    productId
}) => {
    const hasDiscount = comparePrice && comparePrice > price;

    return (
        <div className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-1xl hover:scale-[1] transform border border-gray-100 cursor-pointer">

            {/* 1. Image Area with Hover Actions */}
            <div className="relative h-48 overflow-hidden bg-gray-50">
                <a href={`/products/${productId}`} className='block h-full'>
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </a>
            </div>

            <div className="p-4">

                <div className="flex justify-between items-baseline space-x-2 mb-2">
                    <div className='flex justify-center items-center space-x-2'>
                        <p className="text-xl font-extrabold text-gray-900">
                            ${price.toFixed(2)}
                        </p>

                        {hasDiscount && (
                            <p className="text-sm text-gray-500 line-through">
                                ${comparePrice!.toFixed(2)}
                            </p>
                        )}
                    </div>
                    <div>
                        <span><Heart strokeWidth={1.5} size={22} /></span>
                    </div>
                </div>

                <h3 className="text-lg font-medium text-gray-800 mb-1 line-clamp-2 transition hover:text-blue-600">
                    <a href={`/products/${productId}`}>{title}</a>
                </h3>

                <div className="flex justify-start items-center">
                    <StarRating rating={rating} />
                    <span className="ml-2 text-sm text-gray-500">
                        ({reviewCount} reviews)
                    </span>
                </div>

            </div>
        </div>
    );
};
