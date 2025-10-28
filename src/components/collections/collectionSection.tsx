
import React from 'react';
import { CollectionCard } from './collectionCard';

const collectionsData = [
    {
        title: "Home and kitchen",
        imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1174",
        linkTo: "/collections/home-kitchen",
    },
    {
        title: "Kids Toyes and Playing",
        imageUrl: "https://images.unsplash.com/photo-1541692641319-981cc79ee10a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGtpZHMlMjB0b3lzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        linkTo: "/collections/kids-toys",
    },
    {
        title: "Fitness, Sports & Outdoors",
        imageUrl: "https://images.unsplash.com/photo-1653681506605-3ed4dbc7272e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        linkTo: "/collections/fitness",
    },
    {
        title: "Mobiles, Laptops & Wear...",
        imageUrl: "https://images.unsplash.com/photo-1610277027770-abb0f444c4e4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        linkTo: "/collections/electronics",
    },
    {
        title: "Fashion",
        imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        linkTo: "/collections/fashion",
    },
    {
        title: "Car Accessories",
        imageUrl: "https://images.unsplash.com/photo-1557245526-45dc0f1a8745?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        linkTo: "/collections/car-accessories",
    },

];




// --- 3. Main Component: CollectionItem ---
export const CollectionSection: React.FC = () => {
    return (
        // Container centered and padded for the grid
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            {/* Collections Grid: Responsive 4-column layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                {collectionsData.map((collection, index) => (
                    <CollectionCard
                        key={index}
                        title={collection.title}
                        imageUrl={collection.imageUrl}
                        linkTo={collection.linkTo}
                    />
                ))}
            </div>
        </div>
    );
};