// src/components/reviews/AddReviewDialog.tsx

import React, { useState } from 'react';
import { reviewService, ReviewFormData } from '../../services/reviewService';
import { toast } from 'react-hot-toast';
import { Star, Loader2, Send, X } from 'lucide-react';

// shadcn/ui components
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Input } from '../../components/ui/input'; 

// Star Rating Component
const StarRating: React.FC<{ rating: number; onRate: (rate: number) => void }> = ({ rating, onRate }) => (
    <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
            <Star
                key={star}
                className={`w-8 h-8 cursor-pointer transition-colors ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-gray-400'
                    }`}
                onClick={() => onRate(star)}
            />
        ))}
    </div>
);

interface AddReviewDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    product: { id: string; name: string } | null;
    onReviewSubmitted: () => void; // Parent ko refresh karne ke liye
}

export const AddReview: React.FC<AddReviewDialogProps> = ({ isOpen, onOpenChange, product, onReviewSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const resetForm = () => {
        setRating(0);
        setComment('');
        setImage(null);
        setImagePreview(null);
        setIsLoading(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!product) return;
        if (rating === 0) {
            toast.error('Please select a rating (1-5 stars).');
            return;
        }

        setIsLoading(true);

        try {
            await reviewService.addReview(product.id, {
                rating,
                comment,
                image,
            });

            toast.success('Review submitted for approval!');
            onReviewSubmitted(); // Parent ko inform karein
            onOpenChange(false); // Dialog band karein

        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to submit review.';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    // Jab dialog band ho, form reset karein
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            resetForm();
        }
        onOpenChange(open);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl">Add Review for</DialogTitle>
                    <DialogDescription>{product?.name}</DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    <div className="flex justify-center">
                        <StarRating rating={rating} onRate={setRating} />
                    </div>

                    <Textarea
                        placeholder="What did you like or dislike? (Optional)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                    />

                    <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                    />

                    {imagePreview && (
                        <div className="relative w-24 h-24">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-md border" />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute -top-2 -right-2 rounded-full w-6 h-6"
                                onClick={() => {
                                    setImage(null);
                                    setImagePreview(null);
                                }}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit} disabled={isLoading || rating === 0}>
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="mr-2 h-4 w-4" />
                        )}
                        Submit Review
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};