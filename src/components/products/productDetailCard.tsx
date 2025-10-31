import React, { useState } from 'react';
import { ShoppingCart, Heart, Minus, Plus, Star } from 'lucide-react';
// Import useNavigate to handle navigation
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
interface Review {
    rating: number; comment: string; date: string; reviewerName: string; reviewerEmail?: string;
}
 interface Product {
    id: number; title: string; description: string; price: number; comparePrice?: number;
    rating: number; reviewCount: number; stock: number; imageUrls: string[];
    availableColors: string[]; // <-- This property is in your store but missing here
    availableSizes: string[];
    returnPolicy: string;
    shippingInformation: string;
    reviews: Review[];
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

// --- Helper Component: Review List (Placeholder) ---
// (We assume this component exists and is imported)
const ProductReviewList: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
    // ... (review list logic) ...
    return <div className="text-gray-600">Review list placeholder</div>;
};


// --- Main Component ---
export const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product }) => {
    const navigate = useNavigate(); // <-- Initialize navigate
    const productData = product;

    // Local Component State
    const [selectedImage, setSelectedImage] = useState(productData.imageUrls[0]);
    const [selectedColor, setSelectedColor] = useState(productData.availableColors?.[0] || 'Default Color');
    const [selectedSize, setSelectedSize] = useState(productData.availableSizes[0]);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description'); // Default to description

    // Global State Integration
    const isWishlisted = useWishlistStore(state => state.isWishlisted(productData.id));
    const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
    const { addItemToCart } = useCartStore(state => ({
        addItemToCart: state.addItem,
    }));

    const hasDiscount = productData.comparePrice && productData.comparePrice > productData.price;
    const isAvailable = productData.stock > 0;
    const maxQuantity = productData.stock;

    // Heart icon styling
    const heartColorClass = isWishlisted
        ? 'text-red-600 fill-red-600 hover:bg-red-50'
        : 'text-gray-700 hover:text-red-500 hover:fill-red-100 hover:border-red-300';

    const handleAddToCart = () => {
        addItemToCart({
            id: productData.id,
            title: productData.title,
            price: productData.price,
            // selectedColor: selectedColor,
            selectedSize: selectedSize,
            quantity,
            imageUrl: productData.imageUrls[0],
            stock: productData.stock,
        });
        console.log(`Added ${quantity}x ${productData.title} to cart.`);
    };

    // --- (FIXED) "BUY NOW" LOGIC ---
    const handleBuyNow = () => {
        // 1. Create the payload for the single item
        // This object MUST match the CartItem interface
        const payloadData = {
            id: productData.id,
            variantId: `${productData.id}-${selectedSize}`, // Create a variantId
            title: productData.title,
            price: productData.price,
            selectedColor: selectedColor,
            selectedSize: selectedSize,
            quantity: quantity,
            imageUrl: productData.imageUrls[0],
            stock: productData.stock,
        };

        // 2. Log and navigate, passing the payload in 'state'
        console.log("Sending single item to checkout via location state:", payloadData);
        navigate('/checkout', { state: { buyNowItem: payloadData } });
    };

    // Handler for image-placed wishlist button
    const handleImageWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productData.id);
    };

    // Helper for tab styling
    const getTabClass = (tabName: string) => {
        return `py-3 px-4 font-semibold text-sm rounded-t-lg transition-colors ${activeTab === tabName
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 hover:text-gray-900'
            }`;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 lg:p-12">

                {/* Product Detail Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* 1. Image Gallery */}
                    <div>
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 border border-gray-100 shadow-sm">
                            <img
                                src={selectedImage}
                                alt={productData.title}
                                className="w-full h-full object-cover"
                            />
                            <button
                                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg transition-colors z-10"
                                aria-label="Add to Wishlist"
                                onClick={handleImageWishlistClick}
                            >
                                <Heart size={20} className={heartColorClass} />
                            </button>
                        </div>
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

                    {/* 2. Product Details & Actions */}
                    <div className="space-y-6">
                        <h1 className="text-4xl font-extrabold text-gray-900">{productData.title}</h1>
                        <div className="border-b pb-4">
                            <DetailStarRating rating={productData.rating} reviewCount={productData.reviewCount} />
                        </div>
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
                            {productData.availableColors && productData.availableColors.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Color: <span className='font-normal text-gray-600'>{selectedColor}</span></h3>
                                    <div className="flex space-x-2">
                                        {productData.availableColors.map((color) => (
                                            <button
                                                key={color}
                                                className={`w-8 h-8 rounded-full border-2 transition ${selectedColor === color ? 'ring-2 ring-offset-2 ring-blue-500 border-white' : 'border-gray-300 hover:border-gray-500'}`}
                                                style={{ backgroundColor: color.toLowerCase() }}
                                                onClick={() => setSelectedColor(color)}
                                                aria-label={color}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {productData.availableSizes && productData.availableSizes.length > 0 && (
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
                            )}
                        </div>
                        {/* Actions: Quantity, Cart, Order Now */}
                        <div className="flex items-center space-x-3 pt-4 border-t">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                    className="p-3 text-gray-600 hover:bg-gray-100 rounded-l-lg transition disabled:opacity-50"
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    disabled={quantity <= 1 || !isAvailable}
                                    aria-label="Decrease quantity"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="w-10 text-center text-lg font-semibold text-gray-900">{quantity}</span>
                                <button
                                    className="p-3 text-gray-600 hover:bg-gray-100 rounded-r-lg transition disabled:opacity-50"
                                    onClick={() => setQuantity(q => Math.min(maxQuantity, q + 1))}
                                    disabled={quantity >= maxQuantity || !isAvailable}
                                    aria-label="Increase quantity"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            <button
                                className="flex-1 px-6 py-3 bg-blue cursor-pointer text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg disabled:bg-gray-400 disabled:shadow-none flex items-center justify-center space-x-2"
                                onClick={handleAddToCart}
                                disabled={!isAvailable}
                            >
                                <ShoppingCart size={20} />
                                <span>Add to Cart</span>
                            </button>
                            <button
                                className="flex-1 px-6 py-3 bg-green-600 cursor-pointer text-white text-lg font-bold rounded-lg hover:bg-green-700 transition-colors shadow-lg disabled:bg-gray-400 disabled:shadow-none"
                                onClick={handleBuyNow} // This now works correctly
                                disabled={!isAvailable}
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Description (Moved below actions) */}
                        <div className='pt-4 border-t'>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed prose prose-sm max-w-none">
                                {productData.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional Content Section (Tabs) */}
                <div className="mt-12">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            {/* Shipping/Returns Tab */}
                            <button className={getTabClass('shipping')} onClick={() => setActiveTab('shipping')}>
                                Shipping & Returns
                            </button>
                            {/* Reviews Tab */}
                            <button className={getTabClass('reviews')} onClick={() => setActiveTab('reviews')}>
                                Reviews ({productData.reviewCount})
                            </button>
                        </nav>
                    </div>
                    <div className="py-6">
                        {activeTab === 'shipping' && (
                            <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
                                <div>
                                    <h4 className="font-semibold text-gray-800">Shipping Information</h4>
                                    <p>{productData.shippingInformation}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Return Policy</h4>
                                    <p>{productData.returnPolicy}</p>
                                </div>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <ProductReviewList reviews={productData.reviews} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};