import {  CollectionSection } from "../components/collections/collectionSection";


export const Collection = () => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center space-y-3 mt-[50px]">
                <h1 className="text-4xl font-extrabold">Discover Our Curated Collection</h1>
                <p className="text-lg">
                    Quality, Style, and Innovation for You
                </p>
            </div>
            <div>
                <CollectionSection />
            </div>
        </div>
    );
};
