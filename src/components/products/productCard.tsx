import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { Heart } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useUserStore } from '../../store/user';
import { Link, useNavigate } from 'react-router-dom';

interface ProductCardProps {
    productId: string; // <-- FIX: ID ab string hai
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
            className={`h-4 w-4 ${index < roundedRating ? 'text-amber-400' : 'text-gray-300'}`}
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
    productId
}) => {
    const hasDiscount = comparePrice && comparePrice > price;
    const navigate = useNavigate()
    // --- Wishlist Integration ---
    const isWishlisted = useWishlistStore(state => state.isWishlisted(productId));
    const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
    const isLoggedIn = useUserStore(state => state.isLoggedIn)

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
        toggleWishlist(productId);
    };
    const heartColorClass = isWishlisted
        ? 'text-red-600 fill-red-600 hover:bg-red-50'
        : 'text-gray-400 hover:text-red-500 hover:fill-red-100'; // Not wishlisted

    return (
        <div className="group overflow-hidden transition-all duration-300 hover:rounded-lg  hover:scale-[1.03] transform cursor-pointer">

            <div className="relative h-48 overflow-hidden">
                {/* Click handler add karein */}
                <Link to={`/shop/${productId}`} className='block h-full' >
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover rounded-lg  transition-transform duration-500 group-hover:scale-110 group-hover:rounded-lg"
                    />
                </Link>
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

                <h3 className="text-lg font-medium text-gray-800 mb-1 truncate transition hover:text-blue-600">
                    <Link to={`/shop/${productId}`} >{title}</Link>
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