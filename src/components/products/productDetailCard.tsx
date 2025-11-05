import React, { useState, useEffect, useMemo } from 'react'; // useEffect aur useMemo import karein
import { ShoppingCart, Heart, Minus, Plus, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore, CartItem } from '../../store/useCartStore'; // CartItem import karein
import { useWishlistStore } from '../../store/useWishlistStore';

// --- Types (Corrected to match Store) ---
interface Review {
    rating: number; comment: string; date: string; reviewerName: string; reviewerEmail?: string;
}
// Variant object (jaisa 'variants' array mein hai)
interface Variant {
    _id: string;
    color: string;
    size: string;
    stock: number;
    price: number;
    comparePrice?: number;
    images: { public_id: string, url: string, _id: string }[];
}
// Product object (jaisa store se 'selectedProduct' aata hai)
interface Product {
    id: string; // <-- FIX: ID is string (_id)
    title: string;
    description: string;
    price: number;
    comparePrice?: number;
    rating: number;
    reviewCount: number;
    stock: number;
    imageUrls: string[]; // Default images (from variant[0])
    availableColors: string[];
    availableSizes: string[];
    returnPolicy: string;
    shippingInformation: string;
    reviews: Review[];
    variants: Variant[]; // <-- Full variants data
}

interface ProductDetailCardProps {
    product: Product;
}

// --- Helper Component: Star Rating ---
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

// --- Helper Component: Review List ---
const ProductReviewList: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
    const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
        const reviewStars = Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`h-5 w-5 ${index < review.rating ? 'text-amber-400' : 'text-gray-300'} fill-current`}
                aria-hidden="true"
            />
        ));
        return (
            <div className="border-b border-gray-200 py-6">
                <div className="flex items-center mb-2">
                    <div className="flex items-center">{reviewStars}</div>
                    <span className="ml-3 text-sm font-semibold text-gray-800">{review.reviewerName}</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                    {new Date(review.date).toLocaleDateString("en-US", {
                        year: 'numeric', month: 'long', day: 'numeric'
                    })}
                </p>
                <p className="text-base text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
        );
    };

    return (
        <div className="mt-6">
            {reviews && reviews.length > 0 ? (
                <div className="space-y-6">
                    {reviews.map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))}
                </div>
            ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 font-medium">No reviews yet.</p>
                </div>
            )}
        </div>
    );
};

export const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product }) => {
    const navigate = useNavigate();
    const productData = product;

    const [selectedVariant, setSelectedVariant] = useState<Variant>(productData.variants[0]);
    const [mainImage, setMainImage] = useState(productData.variants[0].images[0].url);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        if (selectedVariant.images.length > 0) {
            setMainImage(selectedVariant.images[0].url);
        }
        setQuantity(1);
    }, [selectedVariant]);

    const currentPrice = selectedVariant.price;
    const currentStock = selectedVariant.stock;
    const currentComparePrice = selectedVariant.comparePrice;

    const allVariantImages = useMemo(() => {
        const allImages = productData.variants.flatMap(v => v.images.map(img => img.url));
        return [...new Set(allImages)];
    }, [productData.variants]);


    const isWishlisted = useWishlistStore(state => state.isWishlisted(productData.id));
    const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
    const { addItemToCart, setBuyNowItem } = useCartStore(state => ({
        addItemToCart: state.addItem,
        setBuyNowItem: state.setBuyNowItem,
    }));

    const hasDiscount = currentComparePrice && currentComparePrice > currentPrice;
    const isAvailable = currentStock > 0;

    const handleColorSelect = (color: string) => {
        const firstVariantOfColor = productData.variants.find(v => v.color === color);
        if (firstVariantOfColor) {
            setSelectedVariant(firstVariantOfColor);
        }
    };

    const handleSizeSelect = (size: string) => {
        const variant = productData.variants.find(v =>
            v.color === selectedVariant.color && v.size === size
        );
        if (variant) {
            setSelectedVariant(variant);
        }
    };

    const sizesForSelectedColor = useMemo(() => {
        return productData.variants
            .filter(v => v.color === selectedVariant.color)
            .map(v => v.size)
            .filter(Boolean); 
    }, [selectedVariant.color, productData.variants]);


    const handleAddToCart = () => {
        addItemToCart({
            id: productData.id,
            title: productData.title,
            price: currentPrice,
            selectedColor: selectedVariant.color, 
            selectedSize: selectedVariant.size,
            quantity,
            imageUrl: selectedVariant.images[0].url, 
            stock: currentStock,
        });
        console.log(`Added ${quantity}x ${productData.title} to cart.`);
    };

    const handleBuyNow = () => {
        const payloadData = {
            id: productData.id,
            title: productData.title,
            price: currentPrice,
            selectedColor: selectedVariant.color,
            selectedSize: selectedVariant.size,
            quantity: quantity,
            imageUrl: selectedVariant.images[0].url,
            stock: currentStock,
        };

        setBuyNowItem(payloadData);
        navigate('/checkout',{state:{
            payloadData
        }});
    };

    const handleImageWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productData.id);
    };

    const heartColorClass = isWishlisted
        ? 'text-red-600 fill-red-600 hover:bg-red-50'
        : 'text-gray-700 hover:text-red-500 hover:fill-red-100 hover:border-red-300';

    const getTabClass = (tabName: string) => {
        return `py-3 px-4 font-semibold text-sm rounded-t-lg transition-colors ${activeTab === tabName
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 hover:text-gray-900'
            }`;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* 1. Image Gallery */}
                    <div>
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 border border-gray-100 shadow-sm">
                            <img
                                src={mainImage} // <-- Use mainImage state
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
                        {/* --- (FIX 6) Thumbnail Selector ab 'allVariantImages' istemaal kar raha hai --- */}
                        <div className="flex space-x-3">
                            {allVariantImages.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition border-2 ${mainImage === url ? 'border-blue-600 shadow-md' : 'border-transparent hover:border-gray-300'}`}
                                    onClick={() => setMainImage(url)} // <-- Set main image on click
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
                        {/* Price & Stock Status (ab 'selectedVariant' se aa raha hai) */}
                        <div className='space-y-3'>
                            <div className="flex items-baseline space-x-3">
                                <p className="text-4xl font-extrabold text-gray-900">
                                    ${currentPrice.toFixed(2)}
                                </p>
                                {hasDiscount && (
                                    <p className="text-xl text-gray-500 line-through">
                                        ${currentComparePrice!.toFixed(2)}
                                    </p>
                                )}
                            </div>
                            {isAvailable ? (
                                <p className="text-base font-semibold text-green-600 flex items-center">
                                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                                    In Stock (Only {currentStock} left)
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
                            {/* Color Selector */}
                            {productData.availableColors.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Color: <span className='font-normal text-gray-600'>{selectedVariant.color}</span></h3>
                                    <div className="flex space-x-2">
                                        {productData.availableColors.map((color) => (
                                            <button
                                                key={color}
                                                className={`w-8 h-8 rounded-full border-2 transition ${selectedVariant.color === color ? 'ring-2 ring-offset-2 ring-blue-500 border-white' : 'border-gray-300 hover:border-gray-500'}`}
                                                style={{ backgroundColor: color.toLowerCase() }}
                                                onClick={() => handleColorSelect(color)} // <-- Use handler
                                                aria-label={color}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Size Selector */}
                            {productData.availableSizes.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Size: <span className='font-normal text-gray-600'>{selectedVariant.size}</span></h3>
                                    <div className="flex space-x-2">
                                        {/* Ab hum 'availableSizes' ki jagah 'sizesForSelectedColor' map karengay */}
                                        {sizesForSelectedColor.map((size) => (
                                            <button
                                                key={size}
                                                className={`px-3 py-1 text-sm rounded-lg border transition ${selectedVariant.size === size ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'}`}
                                                onClick={() => handleSizeSelect(size)} // <-- Use handler
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
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="w-10 text-center text-lg font-semibold text-gray-900">{quantity}</span>
                                <button
                                    className="p-3 text-gray-600 hover:bg-gray-100 rounded-r-lg transition disabled:opacity-50"
                                    onClick={() => setQuantity(q => Math.min(currentStock, q + 1))} // <-- Use dynamic stock
                                    disabled={quantity >= currentStock || !isAvailable}
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            <button
                                className="flex-1 px-6 py-3 bg-blue text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg disabled:bg-gray-400 disabled:shadow-none flex items-center justify-center space-x-2"
                                onClick={handleAddToCart}
                                disabled={!isAvailable}
                            >
                                <ShoppingCart size={20} />
                                <span>Add to Cart</span>
                            </button>
                            <button
                                className="flex-1 px-6 py-3 bg-green-600 text-white text-lg font-bold rounded-lg hover:bg-green-700 transition-colors shadow-lg disabled:bg-gray-400 disabled:shadow-none"
                                onClick={handleBuyNow}
                                disabled={!isAvailable}
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Description */}
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
                            <button className={getTabClass('shipping')} onClick={() => setActiveTab('shipping')}>
                                Shipping & Returns
                            </button>
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