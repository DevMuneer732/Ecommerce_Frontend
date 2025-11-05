import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { Heart } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useWishlistStore } from '../../store/useWishlistStore';

interface ProductCardProps {
    productId: string; // <-- FIX: Changed from number to string
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
            className={`h-4 w-4 ${index < roundedRating ? 'text-amber-500' : 'text-gray-300'}`}
            aria-hidden="true"
        />
    ));
    return <div className="flex items-center">{stars}</div>;
};


export const ProductCard: React.FC<ProductCardProps> = ({
    imageUrl,
    title,
    price,
    comparePrice,
    rating,
    reviewCount = 0,
    productId // Yeh ab "6908...a78fb" jaisi string hai
}) => {
    const hasDiscount = comparePrice && comparePrice > price;

    const isWishlisted = useWishlistStore(state => state.isWishlisted(productId)); // String ID works fine
    const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
    const fetchSingleProduct = useProductStore(state => state.fetchSingleProduct);

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
    };

    // Jab product card par click ho
    const handleProductClick = () => {
        // String ID k sath fetch karein
        fetchSingleProduct(productId);
    };

    const heartColorClass = isWishlisted
        ? 'text-red-600 fill-red-600 hover:bg-red-50'
        : 'text-gray-700 hover:text-red-500 hover:fill-red-100 hover:border-red-300'; // Added hover state

    return (
        <div className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] transform border border-gray-100 cursor-pointer">

            <div className="relative h-48 overflow-hidden bg-gray-50">
                {/* Click handler add karein */}
                <a href={`/shop/${productId}`} className='block h-full' onClick={handleProductClick}>
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
                        <button
                            onClick={handleWishlistClick}
                            aria-label="Toggle wishlist status"
                            className="p-1 focus:outline-none rounded-full"
                        >
                            <Heart strokeWidth={1.5} size={22} className={heartColorClass} />
                        </button>
                    </div>
                </div>

                <h3 className="text-lg font-medium text-gray-800 mb-1 line-clamp-2 transition hover:text-blue-600">
                    {/* Click handler add karein */}
                    <a href={`/shop/${productId}`} onClick={handleProductClick}>{title}</a>
                </h3>

                <div className="flex justify-start items-center">
                    <StarRating rating={rating} />
                    <span className="ml-2 text-sm text-gray-500">
                        ({reviewCount})
                    </span>
                </div>
            </div>
        </div>
    );
};