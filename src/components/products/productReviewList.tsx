import React from 'react';
import { Star } from 'lucide-react';

// --- Types (Should match your Product store) ---
interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
}

interface ProductReviewListProps {
    reviews: Review[];
}

// --- Helper: Single Review Card ---
const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
    // Create an array of stars based on the review's rating
    const stars = Array.from({ length: 5 }, (_, index) => (
        <Star
            key={index}
            className={`h-5 w-5 ${index < review.rating ? 'text-amber-400' : 'text-gray-300'} fill-current`}
            aria-hidden="true"
        />
    ));

    return (
        <div className="border-b border-gray-200 py-6">
            <div className="flex flex-col gap-2 mb-2">
                <div className="flex items-center">{stars}</div>
                <p className="text-sm font-semibold text-gray-800">
                    {review.reviewerName.charAt(0).toUpperCase() + review.reviewerName.slice(1)}
                </p>
            </div>
            {/* <p className="text-sm text-gray-500 mb-3">
                {new Date(review.date).toLocaleDateString("en-US", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </p> */}
            <p className="text-base text-gray-700 leading-relaxed">{review.comment}</p>
        </div>
    );
};

// --- Main Review List Component ---
export const ProductReviewList: React.FC<ProductReviewListProps> = ({ reviews }) => {
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
                    <p className="text-sm text-gray-500 mt-1">Be the first to review this product!</p>
                </div>
            )}
        </div>
    );
};