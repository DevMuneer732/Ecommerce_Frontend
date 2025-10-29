import React, { useState } from 'react';
import { ShoppingCart, Heart, Minus, Plus, Star } from 'lucide-react';
// Assuming the store path is correct based on your structure
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishListStore';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    comparePrice?: number;
    rating: number;
    reviewCount: number;
    stock: number;
    imageUrls:string[];
    availableSizes: string[];
}

interface ProductDetailCardProps {
    product: Product;
}

// --- Helper Component: Star Rating (for details page) ---
const DetailStarRating: React.FC<{ rating: number, reviewCount: number }> = ({ rating, reviewCount }) => {
    const roundedRating = Math.round(rating);
    const stars = Array.from({ length: 5 }, (_, index) => (
        <Star
            key={index}
            className={`h-5 w-5 ${index < roundedRating ? 'text-amber-400' : 'text-gray-300'} fill-current`}
            aria-hidden="true"
        />
    ));
    return (
        <div className="flex items-center space-x-1">
            {stars}
            <span className="ml-2 text-sm text-gray-500 font-medium">
                ({rating.toFixed(1)} / {reviewCount} reviews)
            </span>
        </div>
    );
};


// --- Main Component ---
export const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product }) => {

    const productData = product ;

    // Local Component State
    const [selectedImage, setSelectedImage] = useState(productData.imageUrls[0]);
    const [selectedSize, setSelectedSize] = useState(productData.availableSizes[0]);
    const [quantity, setQuantity] = useState(1);

    // Global State Integration
    const isWishlisted = useWishlistStore(state => state.isWishlisted(productData.id));
    const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
    const addItemToCart = useCartStore(state => state.addItem);

    const hasDiscount = productData.comparePrice && productData.comparePrice > productData.price;
    const isAvailable = productData.stock > 0;
    const maxQuantity = productData.stock;

    // Heart icon styling based on wishlist state
    const heartColorClass = isWishlisted
        ? 'text-red-600 fill-red-600'
        : 'text-gray-300'; 

    const handleAddToCart = () => {
        addItemToCart({
            id: productData.id,
            title: productData.title,
            price: productData.price,
            selectedSize:selectedSize,
            quantity,
            imageUrl: selectedImage,
            stock: productData.stock,
        });
        console.log(`Added ${quantity}x ${productData.title} to cart.`);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        console.log("Navigating directly to Checkout (Simulated).");
    };

    // Handler for image-placed wishlist button
    const handleImageWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productData.id);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 lg:p-12">

                {/* Product Detail Grid: Image Gallery (Left) vs Details (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* 1. Image Gallery / Display (Left Side) */}
                    <div>
                        {/* Main Image Container */}
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 border border-gray-100 shadow-sm">
                            <img
                                src={selectedImage}
                                alt={productData.title}
                                className="w-full h-full object-cover"
                            />

                            {/* --- WISHLIST ICON ON IMAGE (TOP RIGHT) --- */}
                            <button
                                className="absolute top-2 flex right-2 p-2 rounded-full shadow-lg transition-colors z-10"
                                aria-label="Add to Wishlist"
                                onClick={handleImageWishlistClick}
                            >
                                <Heart size={25} className={heartColorClass} />
                            </button>

                        </div>

                        {/* Thumbnail Selector */}
                        <div className="flex space-x-3">
                            {productData.imageUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition border-2 ${selectedImage === url ? 'border-blue-600 shadow-md' : 'border-transparent hover:border-gray-300'}`}
                                    onClick={() => setSelectedImage(url)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 2. Product Details & Actions (Right Side) */}
                    <div className="space-y-6">

                        {/* Title */}
                        <h1 className="text-4xl font-extrabold text-gray-900">{productData.title}</h1>

                        {/* Rating and Reviews */}
                        <div className="border-b pb-4">
                            <DetailStarRating rating={productData.rating} reviewCount={productData.reviewCount} />
                        </div>

                        {/* Price & Stock Status */}
                        <div className='space-y-3'>
                            <div className="flex items-baseline space-x-3">
                                <p className="text-4xl font-extrabold text-gray-900">
                                    ${productData.price.toFixed(2)}
                                </p>
                                {hasDiscount && (
                                    <p className="text-xl text-gray-500 line-through">
                                        ${productData.comparePrice!.toFixed(2)}
                                    </p>
                                )}
                            </div>
                            {/* Stock Status */}
                            {isAvailable ? (
                                <p className="text-base font-semibold text-green-600 flex items-center">
                                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                                    In Stock (Only {productData.stock} left)
                                </p>
                            ) : (
                                <p className="text-base font-semibold text-red-600 flex items-center">
                                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                                    Out of Stock
                                </p>
                            )}
                        </div>

                        {/* Options: Color & Size */}
                        <div className="flex space-x-8 border-t pt-6">

                            {/* Size Selector */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800 mb-2">Size: <span className='font-normal text-gray-600'>{selectedSize}</span></h3>
                                <div className="flex space-x-2">
                                    {productData.availableSizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`px-3 py-1 text-sm rounded-lg border transition ${selectedSize === size ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'}`}
                                            onClick={() => setSelectedSize(size)}
                                            disabled={!isAvailable}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions: Quantity, Cart, Order Now */}
                        <div className="flex items-center space-x-3 pt-4 border-t">

                            {/* Quantity Selector */}
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                    className="p-3 text-gray-600 hover:bg-gray-100 rounded-l-lg transition disabled:opacity-50"
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    disabled={quantity <= 1 || !isAvailable}
                                    aria-label="Decrease quantity"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="w-10 text-center text-lg font-semibold text-gray-900">
                                    {quantity}
                                </span>
                                <button
                                    className="p-3 text-gray-600 hover:bg-gray-100 rounded-r-lg transition disabled:opacity-50"
                                    onClick={() => setQuantity(q => Math.min(maxQuantity, q + 1))}
                                    disabled={quantity >= maxQuantity || !isAvailable}
                                    aria-label="Increase quantity"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                            {/* Add to Cart Button (Primary Action) */}
                            <button
                                className="flex-1 px-6 py-3 bg-gray-700 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg disabled:bg-gray-400 disabled:shadow-none flex items-center justify-center space-x-2"
                                onClick={handleAddToCart}
                                disabled={!isAvailable}
                            >
                                <ShoppingCart size={20} />
                                <span>Add to Cart</span>
                            </button>

                            {/* Order Now Button (Will lead straight to checkout) */}
                            <button
                                className="flex-1 px-6 py-3 bg-green-600 text-white text-lg font-bold rounded-lg hover:bg-green-700 transition-colors shadow-lg disabled:bg-gray-400 disabled:shadow-none"
                                onClick={handleBuyNow}
                                disabled={!isAvailable}
                            >
                                Buy Now
                            </button>

                            {/* REMOVED OLD WISHLIST BUTTON FROM ACTIONS ROW */}
                        </div>

                        {/* Description */}
                        <div className='pt-4'>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {productData.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional Content Section (Reviews, Shipping, etc.) */}
                <div className="mt-12 border-t pt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications & Reviews</h2>
                    <p className="text-gray-600">This section handles shipping, returns, and the review submission (which is required after delivery per the documentation).</p>
                </div>

            </div>
        </div>
    );
};