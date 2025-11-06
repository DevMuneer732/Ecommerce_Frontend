import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Content } from './content';
import { Footer } from './footer';
import { Header } from './header';
import Navbar from './navbar';

// --- (FIX 1) Saaray zaroori stores import karein ---
import { useUserStore } from '../store/user';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';

export const MainLayout: React.FC = () => {
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const fetchCart = useCartStore((state) => state.fetchCart);
    const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);

    useEffect(() => {
        if (isLoggedIn) {
            console.log("User is logged in, fetching cart and wishlist from database...");
            fetchCart();
            fetchWishlist();
        } else {
            console.log("User is a guest.");
        }
    }, [isLoggedIn, fetchCart, fetchWishlist]); // Yeh tab chalay ga jab user login karay ga

    return (
        <>
            <Header />
            <Navbar />
            <Content>
                {/* <Outlet /> component yahan child routes ko render karay ga */}
                <Outlet />
            </Content>
            <Footer />
        </>
    );
};