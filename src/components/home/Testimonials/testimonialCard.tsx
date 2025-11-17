import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid';


interface TestimonialCardProps {
    customerName: string;
    customerImage: string;
    rating: number; // 1-5 stars
    reviewText: string;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const roundedRating = Math.round(rating);
    const stars = Array.from({ length: 5 }, (_, index) => (
        <StarIcon
            key={index}
            className={`h-5 w-5 ${index < roundedRating ? 'text-amber-400' : 'text-gray-300'}`}
            aria-hidden="true"
        />
    ));
    return <div className="flex items-center">{stars}</div>;
};

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
    customerName,
    rating,
    reviewText,
}) => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center h-full">
            <div className='flex justify-center items-center space-x-2 mb-4'>

                <div className='bg-gray-300 h-12 w-12 rounded-3xl flex justify-center items-center'>
                    👤
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {customerName}
                </h3>
            </div>

            <div className="mb-3">
                <StarRating rating={rating} />
            </div>

            <p className="text-gray-600 italic text-base flex-grow">
                "{reviewText}"
            </p>
        </div>
    );
};