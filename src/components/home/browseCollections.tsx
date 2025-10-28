// src/components/home/HomeBrowseCollections.tsx

import React from 'react';
// 💡 IMPORTANT: These imports are required for the carousel to function
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; 

import { CollectionCard } from '../collections/collectionCard'; // Assuming this path is correct

const collectionsData = [
    { title: "Home and kitchen", imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1174", linkTo: "/collections/home-kitchen" },
    { title: "Kids Toyes and Playing", imageUrl: "https://images.unsplash.com/photo-1541692641319-981cc79ee10a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGtpZHMlMjB0b3lzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600", linkTo: "/collections/kids-toys" },
    { title: "Fitness, Sports & Outdoors", imageUrl: "https://images.unsplash.com/photo-1653681506605-3ed4dbc7272e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", linkTo: "/collections/fitness" },
    { title: "Mobiles, Laptops & Wear...", imageUrl: "https://images.unsplash.com/photo-1610277027770-abb0f444c4e4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", linkTo: "/collections/electronics" },
    { title: "Fashion", imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", linkTo: "/collections/fashion" },
    { title: "Car Accessories", imageUrl: "https://images.unsplash.com/photo-1557245526-45dc0f1a8745?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", linkTo: "/collections/car-accessories" },
];

export const BrowseCollections: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            
            {/* ⬅️ THIS IS THE CRUCIAL CHANGE: Using the Swiper Component */}
            <Swiper
                // Define modules for Pagination (dots) and Autoplay
                modules={[Pagination, Autoplay]}
                
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}

                // Responsive breakpoints to show 3 items on large screens
                breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 28 },
                }}
                slidesPerView={1} // Default for small screens
                spaceBetween={15}
                className="mySwiper pb-12" // pb-12 creates space for the dots below the carousel
            >
                {collectionsData.map((collection, index) => (
                    // ⬅️ CRUCIAL: Each item must be a SwiperSlide
                    <SwiperSlide key={index} className="h-full">
                        <CollectionCard
                            title={collection.title}
                            imageUrl={collection.imageUrl}
                            linkTo={collection.linkTo}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* The old placeholder div is now completely removed */}

        </div>
    );
};