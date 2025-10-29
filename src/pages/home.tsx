// import { BrowseCollections } from "../components/home/browseCollections";
import { HomeFeatures } from "../components/home/homeFeatures";
import { ShopNowSection } from "../components/home/shopNow";
import { Testimonials } from "../components/home/Testimonials/testimonials";
import { TrendingProductList } from "../components/products/TrendingProductList";

export const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen"> 

      <ShopNowSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HomeFeatures />
      </div>

      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Discover Our Curated Collections
          </h2>
          <p className="text-lg text-gray-500 mt-2">
            Quality, Style, and Innovation for You
          </p>
        </div>
        <BrowseCollections />
      </div> */}

      {/* 4. TRENDING PRODUCTS SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Trending Products
        </h1>
        <TrendingProductList />
      </div>

      <div>
        <Testimonials />
      </div>
    </div>
  );
};