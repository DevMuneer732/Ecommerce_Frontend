// src/components/common/ProductList.tsx 

import React from 'react';
import { ProductCard } from './productCard';
// Assuming the path is correct

// 1. Define the necessary data structure (Moved here for clean import in other files)
interface ProductData {
    id: number;
    imageUrl: string;
    title: string;
    price: number;
    comparePrice?: number;
    rating: number;
    reviewCount: number;
}

// 2. The Dummy Data Array
const DUMMY_PRODUCTS: ProductData[] = [
    {
        id: 1,
        imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
        title: "Premium Running Shoe V2",
        price: 89.99,
        comparePrice: 120.00,
        rating: 4.5,
        reviewCount: 154
    },
    {
        id: 2,
        imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
        title: "Stylish Leather Backpack",
        price: 45.50,
        rating: 3.8,
        reviewCount: 72
    },
    {
        id: 3,
        imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
        title: "Minimalist Smart Watch",
        price: 199.00,
        comparePrice: 219.00,
        rating: 5.0,
        reviewCount: 450
    },
    {
        id: 4,
        imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
        title: "Noise-Cancelling Headphones",
        price: 79.99,
        rating: 4.2,
        reviewCount: 210
    },
    {
        id: 5,
        imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
        title: "Noise-Cancelling Headphones",
        price: 79.99,
        rating: 4.2,
        reviewCount: 210
    },

    // Add more items here if needed for a longer list
];

// 3. The Component that Renders the Dummy Data
export const ProductList: React.FC = () => {
    return (
        <div className="container mx-auto">

            {/* Product Grid Layout (4 columns on large screens) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {DUMMY_PRODUCTS.map((product) => (
                    <ProductCard
                        key={product.id}
                        productId={product.id}
                        title={product.title}
                        imageUrl={product.imageUrl}
                        price={product.price}
                        comparePrice={product.comparePrice}
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                    />
                ))}
            </div>
        </div>
    );
};