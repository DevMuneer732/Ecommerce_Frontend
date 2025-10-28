// src/components/home/HomeTestimonials.tsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { TestimonialCard } from './testimonialCard';

// Dummy Testimonial Data
const testimonialsData = [
    {
        id: 1,
        customerName: "Alice Wonderland",
        customerImage: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 3,
        reviewText: "Absolutely delighted with my purchase!",
    },
    {
        id: 2,
        customerName: "Bob The Builder",
        customerImage: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4,
        reviewText: "Great experience overall. The product arrived securely packed.",
    },
    {
        id: 3,
        customerName: "Charlie Chaplin",
        customerImage: "https://randomuser.me/api/portraits/men/9.jpg",
        rating: 5,
        reviewText: "Exceptional service and fantastic products!",
    },
    {
        id: 4,
        customerName: "Diana Prince",
        customerImage: "https://randomuser.me/api/portraits/women/50.jpg",
        rating: 4,
        reviewText: "Very happy with the unique items I found here..",
    },
    {
        id: 5,
        customerName: "Eve Harrington",
        customerImage: "https://randomuser.me/api/portraits/women/17.jpg",
        rating: 5,
        reviewText: "A top-tier shopping destination",
    },
];

export const Testimonials: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 ">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-3xl">
                    Trusted by Our Customers
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                    Hear what people are saying about their experience with us.
                </p>
            </div>

            <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    nextEl: '.swiper-button-next-testimonials', 
                    prevEl: '.swiper-button-prev-testimonials',
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                }}
                slidesPerView={1} 
                spaceBetween={20}
                className="mySwiper relative" 
            >
                {testimonialsData.map((testimonial) => (
                    <SwiperSlide key={testimonial.id} className="h-auto">
                        <TestimonialCard {...testimonial}  />
                    </SwiperSlide>
                ))}

                {/* Custom Navigation Arrows */}
                <div className=" swiper-button-prev-testimonials custom-swiper-nav-prev absolute top-1/2 -translate-y-1/2 left-0 z-10 cursor-pointer p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors hidden lg:block">
                    <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </div>
                <div className="swiper-button-next-testimonials custom-swiper-nav-next absolute top-1/2 -translate-y-1/2 right-0 z-10 cursor-pointer p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors hidden lg:block">
                    <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
            </Swiper>
        </div>
    );
};