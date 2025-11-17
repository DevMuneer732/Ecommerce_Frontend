import React from 'react';
import { Star, User } from 'lucide-react'; // <-- (FIX) 'User' icon import karein

// --- Types (Should match your Product store) ---
interface Review {
    _id: string; // <-- (FIX) React key ke liye _id zaroori hai
    rating: number;
    comment: string;
    date: string; // Yeh 'createdAt' se aa sakti hai
    reviewerName: string;
    user: { _id: string; name: string; };
    image?: { url: string; public_id: string }; // Image object
    createdAt?: string; // Mongoose 'timestamps' se
}

interface ProductReviewListProps {
    reviews: Review[];
}

// Helper: Date ko format karein
const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// --- Helper: Single Review Card (Updated UI) ---
const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
    // Stars array
    const stars = Array.from({ length: 5 }, (_, index) => (
        <Star
            key={index}
            className={`h-4 w-4 ${index < review.rating ? 'text-amber-400' : 'text-gray-300'} fill-current`}
            aria-hidden="true"
        />
    ));

    return (
        <div className="py-6">
            {/* --- (FIX) Header (User, Date, Stars) --- */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border">
                        <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">
                            {review.reviewerName}
                        </p>
                        <p className="text-xs text-gray-500">
                            {formatDate(review.createdAt || review.date)}
                        </p>
                    </div>
                </div>
                <div className="flex items-center">{stars}</div>
            </div>
            {/* --- (END FIX) --- */}

            <p className="text-base text-gray-700 leading-relaxed mt-4">{review.comment}</p>

            {/* --- (FIX) Image rendering logic --- */}
            {review.image && review.image.url && (
                <img
                    src={review.image.url}
                    alt="Review attachment"
                    className="mt-4 rounded-lg w-24 h-24 object-cover border border-gray-200"
                />
            )}
            {/* --- (END FIX) --- */}
        </div>
    );
};

// --- Main Review List Component (Updated) ---
export const ProductReviewList: React.FC<ProductReviewListProps> = ({ reviews }) => {
    return (
        <div className="mt-6">
            {reviews && reviews.length > 0 ? (
                // (FIX) 'space-y-6' ke bajaye 'divide-y' behtar hai lines ke liye
                <div className="divide-y divide-gray-200">
                    {reviews.map((review) => (
                        // (FIX) 'key={index}' ke bajaye 'key={review._id}' istemal karein
                        <ReviewCard key={review._id} review={review} />
                    ))}
                </div>
            ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 font-medium">No reviews yet.</p>
                    <p className="text-sm text-gray-500 mt-1">Be the first to review this product!</p>
                </div>
            )}
        </div>
    );
};