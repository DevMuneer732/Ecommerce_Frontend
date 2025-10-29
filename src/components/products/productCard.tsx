import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { Heart } from 'lucide-react';
// Assuming the store path is correct based on your structure
import { useWishlistStore } from '../../store/useWishListStore';
import { useProductStore } from '../../store/useProductStore'; // Correct import

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
            className={`h-4 w-4 ${index < roundedRating ? 'text-amber-500' : 'text-gray-300'}`}
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

    // --- Wishlist Integration ---
    const isWishlisted = useWishlistStore(state => state.isWishlisted(productId));
    const toggleWishlist = useWishlistStore(state => state.toggleWishlist);

    // --- Product Store Integration FIX ---
    // Correct way to retrieve action functions from Zustand:
    const fetchSingleProduct = useProductStore(state => state.fetchSingleProduct);

    const handleWishlistClick = (e: React.MouseEvent) => {
        // CRITICAL FIX: Stop event propagation/default behavior 
        e.preventDefault();
        e.stopPropagation();

        toggleWishlist(productId);
        console.log(`Product ${productId} wishlist status toggled to: ${!isWishlisted}`);
    };

    // New handler for clicking the navigation link
    const handleProductClick = () => {
        // Trigger the fetch action here before navigating (router handles navigation)
        fetchSingleProduct(productId);
        console.log(`Pre-fetching details for product ID: ${productId}`);
    };

    // Determine Heart icon styling
    const heartColorClass = isWishlisted
        ? 'text-red-600 fill-red-600'
        : 'text-gray-300'; 

    return (
        // The main container provides the hover effect
        <div className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] transform border border-gray-100 cursor-pointer">

            {/* 1. Image Area - This entire area links to the detail page */}
            <div className="relative h-48 overflow-hidden bg-gray-50">
                {/* Dynamic Link: /shop/ID */}
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
                        {/* Price */}
                        <p className="text-xl font-extrabold text-gray-900">
                            ${price.toFixed(2)}
                        </p>

                        {/* Compare Price (Strikethrough) */}
                        {hasDiscount && (
                            <p className="text-sm text-gray-500 line-through">
                                ${comparePrice!.toFixed(2)}
                            </p>
                        )}
                    </div>
                    {/* Wishlist Button (Isolated from navigation) */}
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

                {/* Title - Also links to the detail page */}
                <h3 className="text-lg font-medium text-gray-800 mb-1 line-clamp-2 transition hover:text-blue-600">
                    <a href={`/shop/${productId}`} onClick={handleProductClick}>{title}</a>
                </h3>

                {/* Rating */}
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
